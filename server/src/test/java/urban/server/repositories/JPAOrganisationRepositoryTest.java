package urban.server.repositories;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.Organisation;
import urban.server.models.User;
import javax.persistence.EntityManager;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest()
@Transactional
public class JPAOrganisationRepositoryTest {

    private Organisation org1;
    private Organisation org2;

    @Autowired
    EntityManager entityManager;

    @Autowired
    JPAOrganisationRepository jpaOrganisationRepository;

    @Autowired
    JPAUserRepository jpaUserRepository;

    @BeforeEach
    void setUp() {
        org1 = new Organisation("Organisation 1");
        org2 = new Organisation("Organisation 2");
        entityManager.persist(org1);
        entityManager.persist(org2);
        entityManager.flush();
    }

    @AfterEach
    void tearDown() {
        entityManager.remove(org1);
        entityManager.remove(org2);
        entityManager.flush();
        entityManager.close();
        org1 = null;
        org2 = null;
    }

    @Test
    void testBasics_000(){
        assertThat(jpaOrganisationRepository, instanceOf(OrganisationRepository.class));
        assertThat(jpaOrganisationRepository, instanceOf(EntityRepository.class));
        assertThat(org1, instanceOf(Organisation.class));
        assertThat(org2, instanceOf(Organisation.class));
    }

    @Test
    void testFindOrgById_001(){
        // Test both scenarios, an organisation with the correct ID and a random ID
        Organisation result = jpaOrganisationRepository.findById(org1.getId());
        Organisation resultNull = jpaOrganisationRepository.findById(20L);

        assertThat(resultNull, nullValue());
        assertEquals(result, org1);
    }

    @Test
    void testSaveOrg_002(){
        Organisation org = new Organisation("Test organisation");
        jpaOrganisationRepository.save(org);
        assertThat(org, is(notNullValue()));

        Organisation org2 = jpaOrganisationRepository.findById(org.getId()); // Try to get the newly saved Organisation
        assertEquals(org2.getId(), org.getId());
    }

    @Test
    void testDeleteOrg_003(){
        Organisation org = new Organisation("Test organisation");
        jpaOrganisationRepository.save(org);
        jpaOrganisationRepository.delete(org);
        assertNull(jpaOrganisationRepository.findById(org.getId())); // org has been deleted if the findById method returns null
    }

    @Test
    void testFindAllOrgs_004(){
        assertThat(jpaOrganisationRepository.findAll(), hasItems(org1, org2));
        assertThat(jpaOrganisationRepository.findAll(), hasSize(2));
    }

    @Test
    void testFindOrgByUser_005(){
        User user1 = new User("Testuser", "Test", "Test", "Test", false);
        user1 = jpaUserRepository.save(user1);
        org1.addUser(user1);

        // Tests if the findByUser method returns an organisation list of size one which user1 is part of
        assertThat(jpaOrganisationRepository.findByUser(user1.getId()).size(), comparesEqualTo(1));
    }

    @Test
    void testFindOrgByName_006(){
        Organisation org = jpaOrganisationRepository.findByName(org1.getName());
        assertNotNull(org);
        assertEquals(org, org1);
    }

    @Test
    void testFindWrongOrgByName_007() {
        assertThrows(EmptyResultDataAccessException.class,
                ()->{
                jpaOrganisationRepository.findByName("Wrong-org-name");
                });
    }
}
