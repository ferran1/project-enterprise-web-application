package urban.server.repositories;

import urban.server.models.User;

import java.util.List;

public interface UserRepository extends EntityRepository<User> {
    User findByEmail(String email);
}
