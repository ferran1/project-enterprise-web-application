package urban.server.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import urban.server.views.CustomView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NamedQueries({
        @NamedQuery(name = "find_all_organisations", query = "select o from Organisation o"),
        @NamedQuery(name = "find_organisation_by_name", query = "select o from Organisation o where o.name = ?1"),
        @NamedQuery(name = "find_organisation_by_user", query = "select o from Organisation o " +
                "where o.organisationAdmin.id = ?1 or ?1 in (select u.id from User u "
                + "join u.organisations uo WHERE uo.id = o.id)")

})
public class Organisation {
    @Id
    @GeneratedValue
    @JsonView({CustomView.Full.class, CustomView.Shallow.class})
    private Long id;

    @JsonView({CustomView.Full.class, CustomView.Shallow.class})
    private String name;

    @JsonView({CustomView.Full.class})
    @JsonSerialize(using = CustomView.ShallowSerializer.class)
    @ManyToMany(mappedBy = "organisations")
    private List<User> users = new ArrayList<>();

    @ManyToMany(mappedBy = "organisations")
    @JsonSerialize(using = CustomView.ShallowSerializer.class)
    private List<Dataset> datasets = new ArrayList<>();

   /* @JsonView({OrganisationsView.Full.class})
    @JsonSerialize(using = DatasetsView.IdNameSimpleUsersSerializer.class)
    @OneToMany(mappedBy = "datasetOrganisation")
    private List<Dataset> datasets = new ArrayList<>();*/

    @ManyToOne()
    @JsonView({CustomView.Full.class})
    @JsonSerialize(using = CustomView.ShallowSerializer.class)
    private User organisationAdmin;

    // helper
    private static int organisationCount = 100;

    public Organisation() {
    }

    public Organisation(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void addUser(User user) {
        user.addOrganisation(this);
        this.users.add(user);
    }

    @PreRemove
    private void removeUsersFromOrganisation() {
        for (User u : users) {
            u.getOrganisations().remove(this);
        }
    }

    public void deleteUser(User user){
        users.remove(user);
    }

    public void setUser(User user) {
        this.users.add(user);
    }

    /* public List<Dataset> getDatasets() {
         return datasets;
     }
 */
  /*  public void setDatasets(List<Dataset> datasets) {
        this.datasets = datasets;
    }
*/
    public static int getOrganisationCount() {
        return organisationCount;
    }

    public static void setOrganisationCount(int organisationCount) {
        Organisation.organisationCount = organisationCount;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public User getOrganisationAdmin() {
        return organisationAdmin;
    }

    public void setOrganisationAdmin(User organisationAdmin) {
        this.organisationAdmin = organisationAdmin;
    }

    public List<Dataset> getDatasets() {
        return datasets;
    }

    public void addDataset(Dataset dataset) {
        dataset.addOrganisation(this);
        this.datasets.add(dataset);
    }

    public boolean removeUser(User user) {
        this.users.remove(user);
        return this.users.contains(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organisation that = (Organisation) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Organisation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", users=" + users +
                '}';
    }

    public static Organisation getRandomRegistration() {
        return new Organisation("Organisation " + organisationCount++);
    }
}
