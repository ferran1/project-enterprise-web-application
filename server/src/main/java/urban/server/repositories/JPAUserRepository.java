package urban.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.Organisation;
import urban.server.models.User;


import javax.persistence.EntityManager;
import javax.persistence.NamedQuery;
import javax.persistence.TypedQuery;
import java.util.*;

@Repository
@Transactional
public class JPAUserRepository implements UserRepository {

    @Autowired
    private EntityManager em;

    @Override
    public User save(User user) {
        if (user.getId() == null) {
            em.persist(user);
        } else {
            em.merge(user);
        }
        return user;
    }

    @Override
    public void delete(User user) {

        User toRemove = em.merge(user);

        em.remove(toRemove);
    }

    @Override
    public User findById(Long id) {
        return em.find(User.class, id);
    }

    @Override
    public User findByEmail(String email) {
        TypedQuery<User> query = em.createNamedQuery("find_user_by_email", User.class);
        query.setParameter(1, email);

        return query.getSingleResult();
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> namedQuery = em.createNamedQuery("find_all_users", User.class);

        return namedQuery.getResultList();
    }

}
