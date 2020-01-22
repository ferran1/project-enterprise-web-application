package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.CMS;


import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @Author Jesse van Bree
 */

@Repository
@Transactional
public class JPACMSRepository implements CMSRepository {
    @Autowired
    private EntityManager em;

    @Override
    public CMS save(CMS entity) {
        if (entity.getId() == null) {
            em.persist(entity);
        } else {
            em.merge(entity);
        }
        return entity;
    }

    @Override
    public void delete(CMS entity) {
        CMS toRemove = em.merge(entity);

        em.remove(toRemove);
    }

    @Override
    public CMS findById(Long id) {
        return em.find(CMS.class, id);
    }

    @Override
    public List<CMS> findAll() {
        TypedQuery<CMS> namedQuery = em.createNamedQuery("get_all_cms", CMS.class);

        return namedQuery.getResultList();
    }

    @Override
    public List<CMS> findByPage(String page) {
        TypedQuery<CMS> namedQuery = em.createNamedQuery("get_all_cms_by_page", CMS.class);
        namedQuery.setParameter(1, page);
        return namedQuery.getResultList();
    }

    @Override
    public List<CMS> findByComponent(String location) {
        TypedQuery<CMS> namedQuery = em.createNamedQuery("get_all_cms_by_component", CMS.class);
        namedQuery.setParameter(1, location);
        return namedQuery.getResultList();
    }

    @Override
    public List<CMS> findByLocation(String location) {
        TypedQuery<CMS> namedQuery = em.createNamedQuery("get_all_cms_by_location", CMS.class);
        namedQuery.setParameter(1, location);
        return namedQuery.getResultList();
    }
}
