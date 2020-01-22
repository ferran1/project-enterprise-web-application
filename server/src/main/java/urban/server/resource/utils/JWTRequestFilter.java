package urban.server.resource.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;
import urban.server.resource.exceptions.UnAuthorizedException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;


public class JWTRequestFilter extends OncePerRequestFilter {

    private static final Set<String> SECURED_PATHS;

    static {
        SECURED_PATHS = new HashSet<>();
        SECURED_PATHS.add("/datasets");
    }

    @Value("${jwt.pass-phrase}")
    private String passPhrase;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        if (request.getMethod().equalsIgnoreCase("OPTIONS")
                || SECURED_PATHS.stream().noneMatch(servletPath::startsWith)) {
            chain.doFilter(request, response);
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        JWToken jwToken = null;

        if(encodedToken == null){
            throw new UnAuthorizedException("Access denied");
        } else if(encodedToken != null){
            encodedToken = encodedToken.replace("Bearer ", "");
            jwToken = JWToken.decode(encodedToken, passPhrase);
        }

        if(jwToken == null){
            throw new UnAuthorizedException("You need to log in first");
        }




    }
}
