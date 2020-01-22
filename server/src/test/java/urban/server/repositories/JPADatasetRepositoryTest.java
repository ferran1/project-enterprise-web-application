package urban.server.repositories;

import org.hibernate.LazyInitializationException;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import urban.server.models.ChartDataSets;
import urban.server.models.Dataset;
import urban.server.models.helpers.PublicityEnum;
import urban.server.models.helpers.RegionLevelEnum;

import static org.junit.jupiter.api.Assertions.*;


import java.util.List;

/**
 * Author: Mohamed Ben Ali
 */
@SpringBootTest
public class JPADatasetRepositoryTest {

    @Autowired
    private JPADatasetRepository datasetRepo;

    private Dataset dataset1;
    private Dataset dataset2;
    private Dataset dataset3;

    @BeforeEach
    public void setUp() {
        dataset1 = new Dataset("dataset1", RegionLevelEnum.URBAN_LEVEL, PublicityEnum.PRIVATE, null,
                2013, "fileName1", "csv", List.of("label1", "label2"),
                new ChartDataSets("bar", "label", List.of(2, 7), dataset1), "first description");
        ;
        dataset2 = new Dataset("dataset2", RegionLevelEnum.EU_LEVEL, PublicityEnum.PUBLIC, null,
                2011, "fileName2", "csv", List.of("label3", "label4"),
                new ChartDataSets("bar", "label", List.of(18, 200), dataset2), "second description");
        dataset3 = new Dataset("dataset3", RegionLevelEnum.NAT_LEVEL, PublicityEnum.PUBLIC, null,
                2001, "fileName3", "pdf", null,
                null, "third description");
    }

    @Test
    public void testRepoCreateAndRead_400() {
        Dataset savedDataset = datasetRepo.save(dataset1);
        assertTrue(savedDataset.getId() > 0);

        Dataset findDataset = datasetRepo.findById(savedDataset.getId());
        assertEquals(findDataset.getId(), savedDataset.getId());
        assertEquals(findDataset.getName(), savedDataset.getName());
        assertEquals(findDataset.getDescription(), savedDataset.getDescription());
    }

    @Test
    public void testRepoDeleteAndUpdate_401() {
        dataset1 = datasetRepo.save(dataset1);
        assertEquals(1, datasetRepo.findAll().size());
        assertNotNull(datasetRepo.findById(dataset1.getId()));

        dataset1.setName("new name");
        dataset1.setYear(2020);

        datasetRepo.save(dataset1);
        assertEquals("new name", datasetRepo.findById(dataset1.getId()).getName());
        assertEquals(2020, datasetRepo.findById(dataset1.getId()).getYear());

        datasetRepo.delete(dataset1);

        assertNull(datasetRepo.findById(dataset1.getId()));
    }

    @Test
    public void testFindAll_402() {
        datasetRepo.save(dataset1);
        datasetRepo.save(dataset2);
        Assert.assertArrayEquals(new Dataset[]{dataset1, dataset2}, datasetRepo.findAll().toArray());
    }

    @Test
    public void retrieveNonExistentDatasetThrowsException_403() throws Exception,
            RuntimeException, LazyInitializationException {
        assertThrows(LazyInitializationException.class, () -> {
            List<Dataset> datasets = datasetRepo.findAll();
        });

    }


}
