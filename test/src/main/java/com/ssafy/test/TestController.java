package com.ssafy.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World2222222222222222222222";
    }

    @GetMapping("/test")
    public String test() {
        return "test23";
    }
}
