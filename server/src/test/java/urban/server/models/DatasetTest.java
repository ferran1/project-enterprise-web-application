package urban.server.models;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import urban.server.models.helpers.PublicityEnum;
import urban.server.models.helpers.RegionLevelEnum;

import java.util.List;

/**
 * Author: Mohamed Ben Ali
 */
public class DatasetTest {
    private Dataset dataset1;
    private Dataset dataset2;
    private Dataset dataset3;
    private Dataset dataset4;

    @BeforeEach
    public void setUp() {
        dataset1 = new Dataset("dataset1", RegionLevelEnum.URBAN_LEVEL, PublicityEnum.PRIVATE, null,
                2013, "fileName1", "csv", List.of("label1", "label2"),
                new ChartDataSets("bar", "label", List.of(2, 7), dataset1), "first description");
        dataset2 = new Dataset("dataset2", RegionLevelEnum.EU_LEVEL, PublicityEnum.PUBLIC, null,
                2011, "fileName2", "csv", List.of("label3", "label4"),
                new ChartDataSets("bar", "label", List.of(18, 200), dataset2), "second description");
        dataset3 = new Dataset("dataset3", RegionLevelEnum.NAT_LEVEL, PublicityEnum.PUBLIC, null,
                2001, "fileName3", "pdf", null,
                null, "third description");
        dataset4 = new Dataset("dataset4", RegionLevelEnum.EU_LEVEL, PublicityEnum.GROUP, null,
                2020, "fileName4", "csv", List.of("label5", "label6"),
                new ChartDataSets("bar", "label", List.of(12, 19), dataset1), "fourth description");
    }

    @Test
    public void testObjectValues_400(){
        assertEquals("dataset1", dataset1.getName());
        assertEquals(RegionLevelEnum.URBAN_LEVEL, dataset1.getRegion() );
        assertEquals(PublicityEnum.PRIVATE, dataset1.getPublicity());
        assertEquals(2013, dataset1.getYear());
        assertEquals( "fileName1", dataset1.getFileName());
        assertEquals("csv", dataset1.getFileType() );
        assertEquals("label", dataset1.getChart().getLabel());
        assertEquals(List.of("label1", "label2"), dataset1.getChartLabels());
        assertEquals("first description", dataset1.getDescription());
    }

    @Test
    public void testGenerateDataset_401(){
        Dataset generatedDataset = Dataset.generateRandomDataset();
        Assert.assertNotNull(generatedDataset);
        Assert.assertThat(generatedDataset, instanceOf(Dataset.class));
        Assert.assertNotNull(generatedDataset.getName());
    }


}
