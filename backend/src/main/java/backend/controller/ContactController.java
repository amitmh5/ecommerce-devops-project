package backend.controller;

import backend.entity.Contact;
import backend.model.ContactRequest;
import backend.repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public String submitContact(@RequestBody ContactRequest request) {

        Contact contact = new Contact();

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setMessage(request.getMessage());

        contactRepository.save(contact);

        return "Contact request saved successfully";
    }
}
