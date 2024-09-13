package com.ssafy.stock.global.token;

import com.ssafy.stock.global.util.EncryptionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KISTokenService {

    @Value("${KIS_ENCRYPTION_KEY}")
    private String KIS_ENCRYPTION_KEY;

    private String encryptedAccessToken1;  // 암호화된 accessToken1
    private String encryptedAccessToken2;  // 암호화된 accessToken2
    private String encryptedAccessToken3;  // 암호화된 accessToken3

    /**
     * 주어진 토큰을 암호화하여 저장합니다.
     * @param tokenName 토큰의 이름 (예: "token1", "token2", "token3")
     * @param accessToken 암호화할 accessToken 값
     */
    public void setAccessToken(String tokenName, String accessToken) {
        try {
            String encryptedToken = EncryptionUtil.encrypt(accessToken, KIS_ENCRYPTION_KEY);
            switch (tokenName) {
                case "token1":
                    encryptedAccessToken1 = encryptedToken;
                    log.info("token1 암호화 및 저장 완료");
                    break;
                case "token2":
                    encryptedAccessToken2 = encryptedToken;
                    log.info("token2 암호화 및 저장 완료");
                    break;
                case "token3":
                    encryptedAccessToken3 = encryptedToken;
                    log.info("token3 암호화 및 저장 완료");
                    break;
                default:
                    log.error("알 수 없는 토큰 이름: {}", tokenName);
            }
        } catch (Exception e) {
            log.error("{} 암호화 실패", tokenName, e);
        }
    }

    /**
     * 주어진 토큰 이름에 맞는 암호화된 토큰을 복호화하여 반환합니다.
     * @param tokenName 복호화할 토큰의 이름 (예: "token1", "token2", "token3")
     * @return 복호화된 accessToken 값
     */
    public String getAccessToken(String tokenName) {
        try {
            String encryptedToken;
            switch (tokenName) {
                case "token1":
                    encryptedToken = encryptedAccessToken1;
                    break;
                case "token2":
                    encryptedToken = encryptedAccessToken2;
                    break;
                case "token3":
                    encryptedToken = encryptedAccessToken3;
                    break;
                default:
                    log.error("알 수 없는 토큰 이름: {}", tokenName);
                    return null;
            }

            if (encryptedToken != null) {
                return EncryptionUtil.decrypt(encryptedToken, KIS_ENCRYPTION_KEY);
            } else {
                log.error("{} 토큰이 존재하지 않습니다.", tokenName);
                return null;
            }
        } catch (Exception e) {
            log.error("{} 복호화 실패", tokenName, e);
            return null;
        }
    }
}
