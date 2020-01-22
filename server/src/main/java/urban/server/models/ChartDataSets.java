package urban.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import urban.server.views.CustomView;
import urban.server.views.DatasetsView;

import javax.persistence.*;
import java.util.List;

@Entity
public class ChartDataSets {

    @Id
    @GeneratedValue
//    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @JsonView({CustomView.Full.class})
    private long id;

    //    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @JsonView({CustomView.Full.class})
    private String type;
    //    @JsonView({DatasetsView.Full.class, DatasetsView.FullWithoutUser.class, DatasetsView.FullWithoutOrganisation.class})
    @JsonView({CustomView.Full.class})
    private String label;

    @JsonView({CustomView.Full.class})
    @ElementCollection(targetClass = Number.class)
    private List<Object> data;

    @JsonIgnore
    @OneToOne(mappedBy = "chart", cascade = CascadeType.ALL)
    private Dataset dataset;

    public ChartDataSets() {

    }

    public ChartDataSets(String type, String label, List<Object> data, Dataset dataset) {
        this.type = type;
        this.label = label;
        this.data = data;
        this.dataset = dataset;
    }

    public String getLabel() {
        return label;
    }

    public List<Object> getData() {
        return data;
    }

    public String getType() {
        return type;
    }

    public Dataset getDataset() {
        return dataset;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDataset(Dataset dataset) {
        this.dataset = dataset;
    }

}
