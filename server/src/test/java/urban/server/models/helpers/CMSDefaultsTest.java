package urban.server.models.helpers;

import io.jsonwebtoken.lang.Assert;
import org.hamcrest.collection.HasItemInArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

/**
 * @Author Jesse van Bree
 */
class CMSDefaultsTest {
    private CMSDefaults cmsDefaults;
    @BeforeEach
    void setUp() {
        cmsDefaults = new CMSDefaults();
    }

    @AfterEach
    void tearDown() {
        cmsDefaults = null;
    }

    @Test
    void testDefaultValues_500() {
        assertThat(cmsDefaults.getDefaults().size(), greaterThan(0));
        Assert.hasLength(cmsDefaults.getDefaults().get(0).getPage());
    }
}
