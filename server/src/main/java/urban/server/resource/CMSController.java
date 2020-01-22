package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import urban.server.models.CMS;
import urban.server.models.User;
import urban.server.models.helpers.CMSDefaults;
import urban.server.repositories.JPACMSRepository;
import urban.server.repositories.JPADatasetRepository;
import urban.server.views.CMSView;
import urban.server.views.UsersView;

import java.util.List;

/**
 * @Author Jesse van Bree
 */
@RestController
@RequestMapping("/cms")
public class CMSController {
    @Autowired
    private JPACMSRepository cmsRepository;

    @GetMapping("/{component}")
    public MappingJacksonValue getCMSContent(@PathVariable String component) {
        List<CMS> cmsList = cmsRepository.findByComponent(component);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cmsList);
        mappingJacksonValue.setSerializationView(CMSView.Full.class);
        return mappingJacksonValue;
    }

    @GetMapping("")
    public MappingJacksonValue getCMSContent() {
        List<CMS> cmsList = cmsRepository.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cmsList);
        mappingJacksonValue.setSerializationView(CMSView.Full.class);
        return mappingJacksonValue;
    }

    @PostMapping()
    public ResponseEntity<List<CMS>> saveCMSContent(@RequestBody CMS[] cmsList) {
        for (CMS cms: cmsList) {
            cmsRepository.save(cms);
        }

        return ResponseEntity.ok(cmsRepository.findAll());
    }
}
