package urban.server.resource.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWToken {

    private static final String JWT_USERID_CLAIM = "id";
    private static final String JWT_USERNAME_CLAIM = "username";
    private static final String JWT_ADMIN_CLAIM = "admin";

    private String userName = null;
    private Long userId = null;
    private boolean admin = false;

    public JWToken() {

    }

    public JWToken(String userName, Long userId, boolean admin) {
        this.userName = userName;
        this.userId = userId;
        this.admin = admin;
    }

    public String encode(String passPhrase, String issuer, int expiration) {
        System.out.println(passPhrase + " " + issuer + " " + expiration);
        Key key = getKey(passPhrase);

        String token = Jwts.builder()
                .claim(JWT_USERNAME_CLAIM, this.userName)
                .claim(JWT_USERID_CLAIM, this.userId)
                .claim(JWT_ADMIN_CLAIM, this.admin)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return token;
    }

    public static JWToken decode(String encodedToken, String passPhrase) {
        try {
            Key key = getKey(passPhrase);
            Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
            Claims claims = jws.getBody();

            JWToken jwToken = new JWToken(
                    claims.get(JWT_USERNAME_CLAIM).toString(),
                    Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
                    (boolean) claims.get(JWT_ADMIN_CLAIM));

            return jwToken;
        } catch (ExpiredJwtException | MalformedJwtException
                | UnsupportedJwtException | IllegalArgumentException e) {
            return null;
        }
    }

    private static Key getKey(String passPhrase) {
        byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
        Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
        return key;
    }

}
