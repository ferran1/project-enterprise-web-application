package urban.server.models;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.apache.commons.lang3.BooleanUtils.isNotTrue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

public class OrganisationTest {

    Organisation org1;
    Organisation org2;
    Organisation org3;
    Organisation org4;

    @BeforeEach
    void setUp(){
        org1 = new Organisation("Organisation");
        org2 = new Organisation("Organisation2");
        org3 = new Organisation();
        org4 = new Organisation("Organisation");
    }

    @AfterEach
    void tearDown(){
        org1 = null;
        org2 = null;
        org3 = null;
        org4 = null;
    }

    // Test the basics of Organisation
    @Test
    public void testClassBasics_000(){
        assertThat("Assert that org1 is not null" , org1 != null);
        assertThat("Assert that org2 is not null" ,org2 != null);
        assertNotSame(org1, org2);
        isNotTrue(org1.hashCode() == org2.hashCode());
    }

    // Test the Organisation attributes
    @Test
    public void testObjectValues_001(){
        assertNotNull(org1.getName());
        assertNotNull(org2.getName());
        assertNull(org3.getName());
        assertEquals(org1.getName(), org4.getName());
        assertNotSame(org1.getName(), org2.getName());
    }

    // Test the basic methods of Organisation
    @Test
    public void testBasicClassMethods_002(){
        Organisation testOrg = new Organisation("Org1");
        testOrg.setName("Org2");
        assertEquals("Org2", testOrg.getName());

        testOrg.setId(Long.valueOf(5000));
        assertEquals("5000", testOrg.getId().toString());

        User user1 = new User("test@gmail.com", "test", "test", "test", false);
        testOrg.addUser(user1);
        assertThat("User hasn't been added correctly", testOrg.getUsers(), notNullValue());

        testOrg.deleteUser(user1);
        assertThat("User hasn't been deleted", testOrg.getUsers().size(), comparesEqualTo(0));

        testOrg.setOrganisationAdmin(user1);
        assertThat("Failed to set user as the organisation admin", testOrg.getOrganisationAdmin(), equalTo(user1));
    }
}
