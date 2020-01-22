package urban.server.models;

import static org.junit.jupiter.api.Assertions.*;

import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
/**
 * @Author Jesse van Bree
 */
class CMSTest {
    private CMS cms1;
    private CMS cms1Copy;
    private CMS cms2;
    private CMS cms3;

    @BeforeEach
    void setUp() {
        cms1 = new CMS("test", "test", "test1", "test 1");
        cms1Copy = new CMS("test", "test", "test1", "test 1");
        cms2 = new CMS("test2", "test2", "test2", "test 2");
        cms3 = new CMS("test3", "test2", "test3", "test 3");
    }

    @AfterEach
    void tearDown() {
        cms1 = null;
        cms1Copy = null;
        cms2 = null;
        cms3 = null;
    }

    @Test
    void testClassBasics_500() {
        assertFalse(cms2.equals(cms1));
        assertFalse(cms1.hashCode() == cms2.hashCode());
        Assert.isTrue(cms1.equals(cms1Copy));
        Assert.isTrue(cms1.hashCode() == cms1Copy.hashCode());
    }

    @Test
    void testObjectValues_501() {
        Assert.hasText(cms2.getLocation());
        Assert.hasText(cms1.getLocation());
        assertFalse(cms2.getLocation().equals(cms1.getLocation()));
        Assert.isNull(cms1.getAdminInfo());
        Assert.doesNotContain(cms1.getLocation(), "2");
    }
}
