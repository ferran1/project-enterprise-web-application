package urban.server.repositories;

import urban.server.models.Organisation;
import urban.server.models.User;

import java.util.List;

public interface OrganisationRepository extends EntityRepository<Organisation> {
    Organisation findByName(String name);

    List<Organisation> findByUser(Long userId);
}
