package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.models.Organisation;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.models.User;
import urban.server.repositories.JPAUserRepository;
import urban.server.views.CustomView;
import urban.server.views.UsersView;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UsersController {

    @Autowired
    private JPAUserRepository userRepo;

    @GetMapping()
    public MappingJacksonValue getAllUsers() {
        List<User> users = userRepo.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(users);
        mappingJacksonValue.setSerializationView(CustomView.Full.class);
        return mappingJacksonValue;
    }

    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id) {

        User userById = userRepo.findById(id);

        if (userById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return userById;
    }

    @GetMapping("/{email}")
    public User getUserByEmail(
            @PathVariable String email) {

        User byEmail = userRepo.findByEmail(email);

        if (byEmail == null) {
            throw new ResourceNotFoundException("id = " + email);
        }

        return byEmail;
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User savedUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {

        User user = getUserById(id);

        userRepo.delete(user);

        return ResponseEntity.noContent().build();

    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestBody User user) {

        User userById = userRepo.findById(user.getId());

        if (userById == null) {
            throw new ResourceNotFoundException("id = " + user.getId());
        }
        user.setPassWord(userById.getPassWord());
        userRepo.save(user);

        return ResponseEntity.ok(user);
    }

    // This mapping gets all the organisations a user is admin of
    @GetMapping("/adminOrgs/{id}")
    public List<Organisation> getOrganisationsOfAdmin(@PathVariable Long id){

        User user = userRepo.findById(id);

        return user.getAdminOfOrganisations();
    }
}
