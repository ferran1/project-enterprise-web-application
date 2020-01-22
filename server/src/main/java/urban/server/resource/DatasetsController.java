package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.models.Dataset;
import urban.server.models.User;
import urban.server.repositories.JPADatasetRepository;
import urban.server.repositories.JPAUserRepository;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.views.CustomView;
import urban.server.views.DatasetsView;
import urban.server.views.UsersView;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/datasets")
public class DatasetsController {
    @Autowired
    private JPADatasetRepository datasetRepository;

    @GetMapping()
    public MappingJacksonValue getAllDatasets() {
        List<Dataset> datasets = datasetRepository.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(datasets);
        mappingJacksonValue.setSerializationView(CustomView.Full.class);

        return mappingJacksonValue;
    }

    @GetMapping("/{id}")
    public Dataset getDatasetById(
            @PathVariable Long id) {

        Dataset datasetById = datasetRepository.findById(id);

        if (datasetById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return datasetById;
    }

    @PostMapping("/upload")
    public ResponseEntity<Dataset> createDataset(@RequestBody Dataset dataset) {
        Dataset savedDataset = datasetRepository.save(dataset);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedDataset.getId()).toUri();

        return ResponseEntity.created(location).body(savedDataset);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDataset(@PathVariable Long id) {
        Dataset dataset = getDatasetById(id);

        datasetRepository.delete(dataset);

        //Returns no content because the dataset has been deleted
        return ResponseEntity.noContent().build();
    }

    @PutMapping()
    public ResponseEntity<Dataset> updateDataset(@RequestBody Dataset dataset) {
        Dataset datasetById = datasetRepository.findById(dataset.getId());

        if (datasetById == null) {
            throw new ResourceNotFoundException("id = " + dataset.getId());
        }

        datasetRepository.save(dataset);

        return ResponseEntity.ok(dataset);
    }
}
