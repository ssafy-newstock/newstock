package com.ssafy.member.domain.entity.dto;

import com.ssafy.member.domain.entity.Member;
import lombok.Getter;

import java.util.Map;

/*
    OAuth2 인증을 통해 얻은 사용자 정보를 저장하고 관리하기 위한 데이터 구조
 */
@Getter
public class OAuthAttributesDto {
    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String memberName;
    private final String memberProvider;
    private final String memberProviderEmail;
    private final String memberProfileImageUrl;

    public OAuthAttributesDto(Map<String, Object> attributes,
                              String nameAttributeKey,
                              String memberName,
                              String memberProvider,
                              String memberProviderEmail,
                              String memberProfileImageUrl) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.memberName = memberName;
        this.memberProvider = memberProvider;
        this.memberProviderEmail = memberProviderEmail;
        this.memberProfileImageUrl = memberProfileImageUrl;
    }

    /*
        OAuth가 여러 개이면 후에 분기하는 코드
     */
    public static OAuthAttributesDto of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("kakao".equals(registrationId)) {
            return ofKakao("id", registrationId, attributes);
        }

        // TODO: 나중에 삭제
        return ofGoogle(userNameAttributeName, attributes);
    }

    // TODO: 나중에 삭제
    private static OAuthAttributesDto ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return new OAuthAttributesDto(
                attributes,
                userNameAttributeName,
                (String) attributes.get("name"),
                "google",
                (String) attributes.get("email"),
                (String) attributes.get("picture")
        );
    }

    private static OAuthAttributesDto ofKakao(String userNameAttributeName, String registrationId, Map<String, Object> attributes) {
        // 카카오 정보 가져옴
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        // 프로필 정보 가져옴
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        // 개별 정보 가져옴
        String nickname = (String) profile.get("nickname");
        String profileImageUrl = (String) profile.get("profile_image_url");
        boolean isDefaultImage = (boolean) profile.get("is_default_image");

        String providerEmail = (String) kakaoAccount.get("email");

        // 생성자를 통해 OAuthAttributesDto 객체 반환
        return new OAuthAttributesDto(
                attributes,
                userNameAttributeName, // oauth주체자가 user을 주체하는 식별자(ex. kakao는 id를 씀)
                nickname,
                registrationId, // memberProvider(ex. kakao, google)
                providerEmail,
                isDefaultImage ? "https://sarrr.s3.ap-northeast-2.amazonaws.com/%EC%96%BC%EC%9D%8C__1_-removebg-preview.png" : profileImageUrl
        );
    }

    public Member toEntity() {
        return new Member(
                memberName,
                memberProvider,
                memberProviderEmail,
                memberProfileImageUrl
        );
    }
}