package urban.server.models;

import com.fasterxml.jackson.annotation.JsonView;
import urban.server.views.CMSView;

import javax.persistence.*;
import java.util.Objects;

/**
 * @Author Jesse van Bree
 */
@Entity
@NamedQueries({
        @NamedQuery(name = "get_all_cms", query = "select cms from CMS cms"),
        @NamedQuery(name = "get_all_cms_by_page", query = "select cms from CMS cms where cms.page = ?1"),
        @NamedQuery(name = "get_all_cms_by_component", query = "select cms from CMS cms where cms.component = ?1"),
        @NamedQuery(name = "get_all_cms_by_location", query = "select cms from CMS cms where cms.location = ?1")
})
public class CMS {
    @Id
    @JsonView({CMSView.Full.class})
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonView({CMSView.Full.class})
    private String location;

    @JsonView({CMSView.Full.class})
    @Column(length = 2048)
    private String content;

    @JsonView({CMSView.Full.class})
    private String page;

    @JsonView({CMSView.Full.class})
    @Column(length = 512)
    private String adminInfo;

    //TODO: Add component property
    @JsonView({CMSView.Full.class})
    private String component;

    public CMS() {
    }

    public CMS(String location, String page, String component, String content, String adminInfo) {
       this(location, page, component, content);
        this.adminInfo = adminInfo;
    }

    public CMS(String location, String page, String component, String content) {
        this.location = location;
        this.page = page;
        this.component = component;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public String getAdminInfo() {
        return adminInfo;
    }

    public void setAdminInfo(String adminInfo) {
        this.adminInfo = adminInfo;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CMS cms = (CMS) o;
        return Objects.equals(id, cms.id) &&
                Objects.equals(location, cms.location) &&
                Objects.equals(content, cms.content) &&
                Objects.equals(page, cms.page) &&
                Objects.equals(adminInfo, cms.adminInfo) &&
                Objects.equals(component, cms.component);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, location, content, page, adminInfo, component);
    }
}
