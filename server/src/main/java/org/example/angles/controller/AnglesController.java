package org.example.angles.controller;

import org.example.angles.model.Angles;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/angles")
@CrossOrigin(origins = "*") // امکان درخواست از هر دامنه‌ای را فعال می‌کند
public class AnglesController {

    private Angles angles = new Angles();

    // دریافت زاویه‌ها
    @GetMapping
    public ResponseEntity<Angles> getAngles() {
        return ResponseEntity.ok(angles);
    }

    // به‌روزرسانی زاویه‌ها
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateAngles(@RequestBody Angles newAngles) {
        if (newAngles != null) {
            angles.setRoll(newAngles.getRoll());
            angles.setPitch(newAngles.getPitch());
            angles.setYaw(newAngles.getYaw());

            System.out.println("Updated Angles: Roll=" + angles.getRoll() +
                    ", Pitch=" + angles.getPitch() +
                    ", Yaw=" + angles.getYaw());

            return ResponseEntity.ok("{\"message\":\"Angles updated successfully\"}");
        } else {
            return ResponseEntity.badRequest().body("{\"error\":\"Invalid data received\"}");
        }
    }
}
