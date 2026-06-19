package backend.controller;

import backend.model.ContactRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @PostMapping
    public String submitContact(@RequestBody ContactRequest request) {

        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Phone: " + request.getPhone());
        System.out.println("Message: " + request.getMessage());

        return "Contact request received successfully";
    }
}
