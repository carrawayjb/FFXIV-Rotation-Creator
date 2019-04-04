package com.carraway.ffxiv.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String home(Map<String, Object> model) {
        model.put("actions", readCSV(new File(Objects.requireNonNull(
                getClass().getClassLoader().getResource("static/ffxiv-datamining/csv/Action.csv")).getFile())));
        model.put("statuses", readCSV(new File(Objects.requireNonNull(
                getClass().getClassLoader().getResource("static/ffxiv-datamining/csv/Status.csv")).getFile())));
        model.put("classes", readCSV(new File(Objects.requireNonNull(
                getClass().getClassLoader().getResource("static/ffxiv-datamining/csv/ClassJob.csv")).getFile())));

        return "home";
    }

    private List<Map<String,String>> readCSV(File in) {
        List<Map<String,String>> records = new ArrayList<>();

        try(Scanner scanner = new Scanner(in)) {
            System.out.println("Reading " + in.getName() + " CSV file.");
            while(scanner.hasNextLine()) {

                Map<String,String> next;

                switch(in.getName()) {
                    case "ClassJob.csv":
                        next = getClassFromLine(scanner.nextLine());
                        break;
                    default:
                        next = getRecordFromLine(scanner.nextLine());
                        break;
                }


                if(next != null) {
                    records.add(next);
                    System.out.println("Added " + next);
                }
            }

            return records;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        throw new IllegalArgumentException("Something went wrong.");
    }

    private Map<String,String> getClassFromLine(String line) {
        Map<String,String> value = new HashMap<>();

        try(Scanner rowScanner = new Scanner(line)) {
            rowScanner.useDelimiter(",");
            String k = rowScanner.next();
            rowScanner.next();
            String v = rowScanner.next();

            if(!k.equals("#") && !k.equals("int32") && v.length() > 2 && v.matches("\\A\\p{ASCII}*\\z") && Integer.parseInt(k) >= 19) {
                value.put(k, v.replace("\"", ""));
                return value;
            }
            return null;
        }
    }

    private Map<String,String> getRecordFromLine(String line) {
        Map<String,String> value = new HashMap<>();

        try(Scanner rowScanner = new Scanner(line)) {
            rowScanner.useDelimiter(",");
            String k = rowScanner.next();
            String v = rowScanner.next();

            if(!k.equals("#") && !k.equals("int32") && v.length() > 2 && v.matches("\\A\\p{ASCII}*\\z")) {
                value.put(k, v);
                return value;
            }
            return null;
        }
    }
}
