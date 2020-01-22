package urban.server.repositories;

import urban.server.models.Dataset;

import java.util.List;

/**
 * @Doel
 * @Author Jesse van Bree
 */
public interface EntityRepository<T> {
    T save(T entity);

    void delete(T entity);

    T findById(Long id);

    List<T> findAll();
}
