package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.Dataset;
import urban.server.models.User;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@Transactional
public class JPADatasetRepository implements EntityRepository<Dataset> {

    @Autowired
    private EntityManager em;

    @Override
    public Dataset save(Dataset dataset) {
        if (dataset.getId() == null) {
            em.persist(dataset);
        } else {
            em.merge(dataset);
        }
        return dataset;
    }

    @Override
    public void delete(Dataset dataset) {

        Dataset toRemove = em.merge(dataset);

        em.remove(toRemove);
    }

    @Override
    public Dataset findById(Long id) {
        return em.find(Dataset.class, id);
    }

    @Override
    public List<Dataset> findAll() {
        TypedQuery<Dataset> namedQuery = em.createNamedQuery("find_all_datasets", Dataset.class);

        return namedQuery.getResultList();
    }


}
