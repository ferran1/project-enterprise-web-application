package urban.server.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import urban.server.models.User;
import urban.server.resource.utils.JWToken;
import urban.server.repositories.JPAUserRepository;
import urban.server.resource.exceptions.AuthenticationException;
import urban.server.resource.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

    @Autowired
    JPAUserRepository userRepository;

    @Autowired
    JWToken jwTokenGenerator;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.pass-phrase}")
    private String passPhrase;

    @Value("${jwt.expiration-seconds}")
    private int expiration;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody ObjectNode loginRequest){
        JsonNode email = loginRequest.findValue("email");
        JsonNode passWord = loginRequest.findValue("passWord");

        User user = userRepository.findByEmail(email.asText());

        if(user == null){
            throw new ResourceNotFoundException("User not found");
        } else if(!user.getPassWord().equals(passWord.asText())){
            throw new AuthenticationException("Invalid credentials");
        }

        JWToken jwToken = new JWToken(user.getEmail(), user.getId(), user.isAdmin());
        String token = jwToken.encode(passPhrase, issuer, expiration);

        return ResponseEntity.accepted()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(user);
    }
}
