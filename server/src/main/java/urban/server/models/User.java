package urban.server.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import urban.server.views.CustomView;
import urban.server.views.DatasetsView;
import urban.server.views.OrganisationsView;
import urban.server.views.UsersView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Entity
@NamedQueries({
        @NamedQuery(name = "find_all_users", query = "select u from User u"),
        @NamedQuery(name = "find_user_by_email", query = "select u from User u" +
                " where u.email = ?1")
})
public class User {
    @Id
    @GeneratedValue
    @JsonView({CustomView.Full.class, CustomView.Shallow.class})
    private Long id;

    @JsonView({CustomView.Full.class, CustomView.Shallow.class})
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonView({CustomView.Full.class})
    private String firstName;

    @JsonView({CustomView.Full.class})
    private String surName;

    @JsonView({CustomView.Full.class})
    private LocalDateTime dateCreated;

    @JsonView({CustomView.Full.class, CustomView.Shallow.class})
    private boolean isAdmin;

    @JsonView({CustomView.Full.class})
    @JsonSerialize(using = CustomView.ShallowSerializer.class)
    @ManyToMany()
    private List<Organisation> organisations = new ArrayList<>();

    @JsonView({CustomView.Full.class})
    @JsonSerialize(using = CustomView.ShallowSerializer.class)
    @OneToMany(mappedBy = "user")
    private List<Dataset> datasets = new ArrayList<>();

    @OneToMany(mappedBy = "organisationAdmin")
    @JsonView({CustomView.Full.class})
    private List<Organisation> adminOfOrganisations;

    // we need to have a default no argument constructor so that we can create user without giving all attributes
    public User() {

    }

    private User(String email, String firstName, String surName, boolean isAdmin, List<Organisation> organisations) {
        this.email = email;
        this.firstName = firstName;
        this.surName = surName;
        this.dateCreated = LocalDateTime.now();
        this.isAdmin = isAdmin;
    }

    public User(String email, String password, String firstName, String surName, boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.surName = surName;
        this.dateCreated = LocalDateTime.now();
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstname='" + firstName + '\'' +
                ", lastname='" + surName + '\'' +
                ", creationDate=" + dateCreated +
                ", isAdmin=" + isAdmin +
                ", organisation=" +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) throws Exception {
        if (dateCreated.isAfter(LocalDateTime.now())) {
            throw new Exception("Creation date can not be after the current time");
        }
        this.dateCreated = dateCreated;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public List<Dataset> getDatasets() {
        return datasets;
    }

    public void setDatasets(List<Dataset> datasets) {
        this.datasets = datasets;
    }

    public String getPassWord() {
        return this.password;
    }

    public void setPassWord(String password) {
        this.password = password;
    }

    public void addDataset(Dataset dataset) {
        dataset.setUser(this);
        this.datasets.add(dataset);
    }

    public List<Organisation> getAdminOfOrganisations() {
        return adminOfOrganisations;
    }

    public void setAdminOfOrganisations(List<Organisation> organisations) {
        adminOfOrganisations = organisations;
    }

    public void addAdminOfOrganisation(Organisation organisation) {
        adminOfOrganisations.add(organisation);
    }

    public void deleteOrganisation(Organisation organisation){
        organisations.remove(organisation);
    }

    public List<Organisation> getOrganisations() {
        return organisations;
    }

    public void addOrganisation(Organisation organisation) {
        this.organisations.add(organisation);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public static User generateRandomUser() {
        return new User(getSaltString() + "@hva.nl", "testing", null, null, getRandomIsAdmin());
    }

    private static boolean getRandomIsAdmin() {
        return Math.random() < 0.5;
    }

    private static String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 10) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }
}
