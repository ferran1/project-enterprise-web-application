package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.Organisation;
import urban.server.models.User;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@Transactional
public class JPAOrganisationRepository implements OrganisationRepository {
    @Autowired
    private EntityManager em;

    @Override
    public Organisation save(Organisation organisation) {
        if (organisation.getId() == null) {
            em.persist(organisation);
        } else {
            em.merge(organisation);
        }
        return organisation;
    }

    @Override
    public void delete(Organisation organisation) {
        Organisation toRemove = em.merge(organisation);

        em.remove(toRemove);
    }

    @Override
    public Organisation findById(Long id) {
        return em.find(Organisation.class, id);
    }

    @Override
    public List<Organisation> findAll() {
        TypedQuery<Organisation> namedQuery = em.createNamedQuery("find_all_organisations", Organisation.class);

        return namedQuery.getResultList();
    }

    @Override
    public Organisation findByName(String name) {
        TypedQuery<Organisation> namedQuery = em.createNamedQuery("find_organisation_by_name", Organisation.class);
        namedQuery.setParameter(1, name);

        return namedQuery.getSingleResult();
    }

    @Override
    public List<Organisation> findByUser(Long userId) {
        TypedQuery<Organisation> namedQuery = em.createNamedQuery("find_organisation_by_user", Organisation.class);
        namedQuery.setParameter(1, userId);

        return namedQuery.getResultList();
    }
}
