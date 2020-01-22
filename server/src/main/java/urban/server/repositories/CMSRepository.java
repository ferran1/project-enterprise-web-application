package urban.server.repositories;

import urban.server.models.CMS;

import java.util.List;

public interface CMSRepository extends EntityRepository<CMS> {
    List<CMS> findByPage(String page);
    List<CMS> findByComponent(String location);
    List<CMS> findByLocation(String location);
}
