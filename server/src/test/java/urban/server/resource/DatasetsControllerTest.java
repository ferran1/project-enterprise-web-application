package urban.server.resource;

import org.junit.Assert;
import org.junit.Assert.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import urban.server.models.ChartDataSets;
import urban.server.models.Dataset;
import urban.server.models.helpers.PublicityEnum;
import urban.server.models.helpers.RegionLevelEnum;

import java.util.List;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Author: Mohamed Ben Ali
 * */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DatasetsControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

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
    public void postDataset_000(){
        ResponseEntity<Dataset> responseEntity =
                this.restTemplate.postForEntity("/datasets/upload", dataset1, Dataset.class);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    }

}
