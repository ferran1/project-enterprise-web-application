package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.models.Dataset;
import urban.server.models.Organisation;
import urban.server.models.User;
import urban.server.models.helpers.PublicityEnum;
import urban.server.repositories.JPADatasetRepository;
import urban.server.repositories.JPAOrganisationRepository;
import urban.server.repositories.JPAUserRepository;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.views.CustomView;
import urban.server.views.OrganisationsView;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/organisations")
public class OrganisationsController {

    @Autowired
    private JPAOrganisationRepository organisationRepo;

    @Autowired
    private JPAUserRepository userRepository;

    @Autowired
    private JPADatasetRepository datasetRepository;

    // Get mapping to get all the organisations
    @GetMapping()
    public MappingJacksonValue getAllOrganisations() {
        List<Organisation> organisations = organisationRepo.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(organisations);
        mappingJacksonValue.setSerializationView(CustomView.Full.class);
        return mappingJacksonValue;
    }

    @GetMapping("/orgMembers/{id}")
    public ResponseEntity<List<User>> getOrganisationMembers(@PathVariable Long id){
        Organisation org = organisationRepo.findById(id);

        return ResponseEntity.ok(org.getUsers());
    }

    @GetMapping("/organisation-datasets/{id}")
    public ResponseEntity<List<Dataset>> getDatasetByOrganisation(@PathVariable Long id){
        Organisation organisation = organisationRepo.findById(id);
        if(organisation == null) throw new ResourceNotFoundException("Organisation with id: " + id + " not found");
        List<Dataset> datasets = organisation.getDatasets();

        return ResponseEntity.ok(datasets);
    }

    // Get mapping to get an organisation by the id
    @GetMapping("/{id}")
    public Organisation getOrganisationById(
            @PathVariable Long id) {

        Organisation organisationById = organisationRepo.findById(id);

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return organisationById;
    }

    // Retrieves organisations that given user is part of
    @GetMapping("/find-by-user/{userId}")
    public ResponseEntity<List<Organisation>> getOrganisationByUserID(@PathVariable Long userId){

        User user = this.userRepository.findById(userId);
        if(user == null) {
            throw new ResourceNotFoundException("User with id: " +  userId + " not found");
        }
        List<Organisation> userOrganisations = this.organisationRepo.findByUser(userId);

        return ResponseEntity.ok(userOrganisations);
    }


    // Post mapping to create an organisation
    @PostMapping()
    public ResponseEntity<Organisation> createOrganisation(@RequestBody Organisation organisation) {

        Organisation savedOrganisation = organisationRepo.save(organisation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedOrganisation.getId()).toUri();

        return ResponseEntity.created(location).body(savedOrganisation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Organisation> deleteOrganisation(@PathVariable Long id) {

        Organisation organisation = organisationRepo.findById(id);
        for(Dataset dataset : organisation.getDatasets()) {
            dataset.setOrganisations(null);
            dataset.setPublicity(PublicityEnum.PRIVATE);
            datasetRepository.save(dataset);
        }
        organisationRepo.delete(organisation);

        return ResponseEntity.noContent().build();
    }

    @PutMapping()
    public ResponseEntity<Organisation> updateOrganisation(@RequestBody Organisation organisation) {

        Organisation organisationById = organisationRepo.findById(organisation.getId());

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + organisation.getId());
        }

        organisationRepo.save(organisation);

        return ResponseEntity.ok(organisation);
    }

    //Changes admin of organisation and title of organisation(optional)
    @PutMapping("/{organisationId}")
    public ResponseEntity<Organisation> changeOrgAdmin(@PathVariable Long organisationId,
            @RequestParam(name="user") Long userId,
            @RequestParam(name="name", required=false) String newOrgName){
        Organisation organisation = organisationRepo.findById(organisationId);
        User user = userRepository.findById(userId);

        organisation.setOrganisationAdmin(user);
        if(newOrgName != null) organisation.setName(newOrgName);

        organisationRepo.save(organisation);

       return ResponseEntity.ok(organisation);
    }


    // Add user to org
    @PostMapping("/{organisationId}/{userId}")
    public ResponseEntity<User> addExistingUser(@PathVariable Long organisationId, @PathVariable Long userId) {

        Organisation organisation = organisationRepo.findById(organisationId);
        User userToBeAdded = userRepository.findById(userId);

        organisation.addUser(userToBeAdded);

        organisationRepo.save(organisation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{userId}").buildAndExpand(userToBeAdded.getId()).toUri();

        return ResponseEntity.created(location).body(userToBeAdded);
    }

    // Delete mapping to delete a user from an organisation
    @DeleteMapping("/{organisationId}/{userId}")
    public ResponseEntity<Organisation> deleteUser(@PathVariable Long organisationId, @PathVariable Long userId) {

        Organisation organisation = getOrganisationById(organisationId);
        User user = userRepository.findById(userId);

        organisation.deleteUser(user);
        user.deleteOrganisation(organisation);

        organisationRepo.save(organisation);

        return ResponseEntity.ok(organisation);
    }

}
