package com.artistikcity.web;

import com.artistikcity.http.NotFoundException;
import com.artistikcity.inertia.Inertia;
import com.artistikcity.service.CourseService;
import com.artistikcity.support.Db;
import com.artistikcity.support.Row;
import com.artistikcity.support.Str;
import com.artistikcity.support.Values;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.LinkedHashMap;
import java.util.Map;

/** Course catalogue and course details (CoursesController.php). */
@Controller
public class CoursesController {

    private final Inertia inertia;
    private final Db db;
    private final CourseService courses;

    public CoursesController(Inertia inertia, Db db, CourseService courses) {
        this.inertia = inertia;
        this.db = db;
        this.courses = courses;
    }

    @GetMapping("/courses")
    public ResponseEntity<String> courses(HttpServletRequest request,
                                          @RequestParam(value = "type", required = false) String type,
                                          @RequestParam(value = "medium", required = false) String medium,
                                          @RequestParam(value = "genre", required = false) String genre,
                                          @RequestParam(value = "skill", required = false) String skill,
                                          @RequestParam(value = "category", required = false) String category) {
        String t = type == null || type.isEmpty() ? "course" : type;
        var list = courses.withRelations(courses.catalogue(t, Values.toLong(medium), Values.toLong(genre),
                Values.toLong(skill), Values.toLong(category)), true);
        Map<String, Object> props = new LinkedHashMap<>();
        props.put("courses", courses.collection(list));
        props.put("categories", db.select("select * from categories order by id"));
        props.put("course_types", db.select("select * from course_types order by id"));
        props.put("genres", db.select("select * from genres order by id"));
        props.put("mediums", db.select("select * from mediums order by id"));
        props.put("skills", db.select("select * from skills order by id"));
        props.put("type", Str.ucfirst(t));
        return inertia.render(request, "Courses", props);
    }

    @GetMapping("/course/{slug}")
    public ResponseEntity<String> courseDetails(HttpServletRequest request, @PathVariable("slug") String slug) {
        Row course = NotFoundException.orFail(db.first("select * from courses where slug = ?", slug));
        courses.withRelations(course, false);
        return inertia.render(request, "CourseDetails", Map.of("course", courses.resource(course)));
    }
}
