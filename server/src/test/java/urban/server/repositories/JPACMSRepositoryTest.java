package urban.server.repositories;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import urban.server.models.CMS;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import javax.persistence.EntityManager;
import java.util.List;

/**
 * @Author Jesse van Bree
 */
@SpringBootTest()
@Transactional
public class JPACMSRepositoryTest {
    private CMS cms1;
    private CMS cms2;
    private CMS cms3;
    private CMS cms4;

    @Autowired
    EntityManager entityManager;

    @Autowired
    JPACMSRepository jpacmsRepository;

    @BeforeEach
    void setUp() {
        cms1 = new CMS("test", "test", "test1", "test 1");
        cms2 = new CMS("test2", "test2", "test2", "test 2");
        cms3 = new CMS("test3", "test2", "test2", "test 3");
        cms4 = new CMS("test4", "test4", "test4", "test 4");

        entityManager.persist(cms2);
        entityManager.persist(cms3);
        entityManager.persist(cms4);
        entityManager.flush();
    }

    @AfterEach
    void tearDown() {
        if(entityManager.find(CMS.class, cms2.getId()) != null) entityManager.remove(cms2);
        if(entityManager.find(CMS.class, cms3.getId()) != null) entityManager.remove(cms3);
        if(entityManager.find(CMS.class, cms4.getId()) != null) entityManager.remove(cms4);
        entityManager.flush();

        cms1 = null;
        cms2 = null;
        cms3 = null;
        cms4 = null;
    }

    @Test
    void testClassBasics_000() {
        assertThat(jpacmsRepository, instanceOf(CMSRepository.class));
        assertThat(jpacmsRepository, instanceOf(EntityRepository.class));
    }

    @Test
    void testSetCMSValue_001() {
        jpacmsRepository.save(cms1);
        CMS result = entityManager.find(CMS.class, cms1.getId());
        assertEquals(result, cms1);
        assertNotEquals(result, cms3);
    }

    @Test
    void testGetCMSValue_002() {
        assertThat(jpacmsRepository.findAll(), hasItems(cms2, cms2));
    }

    @Test
    void testDeleteCMSValue_003() {
        jpacmsRepository.delete(cms4);
        assertThat(entityManager.find(CMS.class, cms4.getId()), nullValue());
    }

    @Test
    void testGetByIdCMSValue_004() {
        CMS result = jpacmsRepository.findById(cms2.getId());
        CMS resultNull = jpacmsRepository.findById(420L);
        assertEquals(result, cms2);
        assertThat(resultNull, nullValue());
    }

    @Test
    void testGetByPageCMSValue_005() {
        List<CMS> result = jpacmsRepository.findByPage(cms2.getPage());
        List<CMS> resultNull = jpacmsRepository.findByPage("notAChanceLOL");
        assertThat(result.size(), equalTo(2));
        assertThat(resultNull.size(), equalTo(0));
    }

    @Test
    void testGetByLocationCMSValue_006() {
        List<CMS> result = jpacmsRepository.findByLocation(cms2.getLocation());
        List<CMS> resultNull = jpacmsRepository.findByLocation("notAChanceLOL");
        assertThat(result.size(), equalTo(1));
        assertThat(resultNull.size(), equalTo(0));
    }

    @Test
    void testGetByComponentCMSValue_007() {
        List<CMS> result = jpacmsRepository.findByComponent(cms2.getComponent());
        List<CMS> resultNull = jpacmsRepository.findByComponent("notAChanceLOL");
        assertThat(result.size(), equalTo(2));
        assertThat(resultNull.size(), equalTo(0));
    }
}
