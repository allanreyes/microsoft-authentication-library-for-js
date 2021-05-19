import sinon from "sinon";
import { CryptoOps, CachedKeyPair } from "../../src/crypto/CryptoOps";
import { GuidGenerator } from "../../src/crypto/GuidGenerator";
import { BrowserCrypto } from "../../src/crypto/BrowserCrypto";
import { createHash } from "crypto";
import { PkceCodes, BaseAuthRequest } from "@azure/msal-common";
import { TEST_URIS } from "../utils/StringConstants";
import { DatabaseStorage } from "../../src/cache/DatabaseStorage";

describe("CryptoOps.ts Unit Tests", () => {
    let cryptoObj: CryptoOps;
    let dbStorage = {};
    beforeEach(() => {
        sinon.stub(DatabaseStorage.prototype, "open").callsFake(async (): Promise<void> => {
            dbStorage = {};
        });

        sinon.stub(DatabaseStorage.prototype, "put").callsFake(async (key: string, payload: CachedKeyPair): Promise<void> => {
            dbStorage[key] = payload;
        });
        cryptoObj = new CryptoOps();
    });

    afterEach(() => {
        sinon.restore();
    });

    it("createNewGuid()", () => {
        expect(GuidGenerator.isGuid(cryptoObj.createNewGuid())).toBe(true);
    });

    it("base64Encode()", () => {
        /**
         * From RFC 4648 Section 10
         * BASE64("") = ""
         * BASE64("f") = "Zg=="
         * BASE64("fo") = "Zm8="
         * BASE64("foo") = "Zm9v"
         * BASE64("foob") = "Zm9vYg=="
         * BASE64("fooba") = "Zm9vYmE="
         * BASE64("foobar") = "Zm9vYmFy"
         */
        expect(cryptoObj.base64Encode("")).toHaveLength(0);
        expect(cryptoObj.base64Encode("f")).toBe("Zg==");
        expect(cryptoObj.base64Encode("fo")).toBe("Zm8=");
        expect(cryptoObj.base64Encode("foo")).toBe("Zm9v");
        expect(cryptoObj.base64Encode("foob")).toBe("Zm9vYg==");
        expect(cryptoObj.base64Encode("fooba")).toBe("Zm9vYmE=");
        expect(cryptoObj.base64Encode("foobar")).toBe("Zm9vYmFy");
    });

    it("base64Decode()", () => {
        /**
         * From RFC 4648 Section 10
         * BASE64("") = ""
         * BASE64("f") = "Zg=="
         * BASE64("fo") = "Zm8="
         * BASE64("foo") = "Zm9v"
         * BASE64("foob") = "Zm9vYg=="
         * BASE64("fooba") = "Zm9vYmE="
         * BASE64("foobar") = "Zm9vYmFy"
         */
        expect(cryptoObj.base64Decode("")).toHaveLength(0);
        expect(cryptoObj.base64Decode("Zg==")).toBe("f");
        expect(cryptoObj.base64Decode("Zm8=")).toBe("fo");
        expect(cryptoObj.base64Decode("Zm9v")).toBe("foo");
        expect(cryptoObj.base64Decode("Zm9vYg==")).toBe("foob");
        expect(cryptoObj.base64Decode("Zm9vYmE=")).toBe("fooba");
        expect(cryptoObj.base64Decode("Zm9vYmFy")).toBe("foobar");
    });

    it("generatePkceCode() creates a valid Pkce code", async () => {
        sinon.stub(BrowserCrypto.prototype, <any>"getSubtleCryptoDigest").callsFake(async (algorithm: string, data: Uint8Array): Promise<ArrayBuffer> => {
            expect(algorithm).toBe("SHA-256");
            return createHash("SHA256").update(Buffer.from(data)).digest();
        });

        /**
         * Contains alphanumeric, dash '-', underscore '_', plus '+', or slash '/' with length of 43.
         */
        const regExp = new RegExp("[A-Za-z0-9-_+/]{43}");
        const generatedCodes: PkceCodes = await cryptoObj.generatePkceCodes();
        expect(regExp.test(generatedCodes.challenge)).toBe(true);
        expect(regExp.test(generatedCodes.verifier)).toBe(true);
    });

    it("getPublicKeyThumbprint() generates a valid request thumbprint", async () => {
        jest.setTimeout(10000);
        sinon.stub(BrowserCrypto.prototype, <any>"getSubtleCryptoDigest").callsFake(async (algorithm: string, data: Uint8Array): Promise<ArrayBuffer> => {
            expect(algorithm).toBe("SHA-256");
            return createHash("SHA256").update(Buffer.from(data)).digest();
        });
        const generateKeyPairSpy = sinon.spy(BrowserCrypto.prototype, "generateKeyPair");
        const exportJwkSpy = sinon.spy(BrowserCrypto.prototype, "exportJwk");
        const pkThumbprint = await cryptoObj.getPublicKeyThumbprint({resourceRequestMethod: "POST", resourceRequestUri: TEST_URIS.TEST_AUTH_ENDPT_WITH_PARAMS} as BaseAuthRequest);
        /**
         * Contains alphanumeric, dash '-', underscore '_', plus '+', or slash '/' with length of 43.
         */
        const regExp = new RegExp("[A-Za-z0-9-_+/]{43}");
        expect(generateKeyPairSpy.calledWith(true, ["sign", "verify"]));
        expect(exportJwkSpy.calledWith((await generateKeyPairSpy.returnValues[0]).publicKey));
        expect(regExp.test(pkThumbprint)).toBe(true);
        expect(Object.keys(dbStorage[pkThumbprint])).not.toHaveLength(0);
    });
});
