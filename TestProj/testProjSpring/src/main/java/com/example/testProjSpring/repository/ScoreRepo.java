package com.example.testProjSpring.repository;

import java.util.List;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.example.testProjSpring.security.auth.RegisterRequest;
import com.mongodb.client.result.UpdateResult;

@Repository
public class ScoreRepo {

    @Autowired
    private MongoTemplate template;

    public Document postInitialScore(RegisterRequest request) {
        Document doc = new Document();
        doc.put("username", request.getUsername());
        doc.put("mathScore", 0);
        return template.insert(doc,"mathScores");
    }

    public Boolean updateScore(String username, Integer mathScore) {
        Query query = Query.query(
            Criteria.where("username").is(username)
        );

        Update updateOps = new Update()
            .set("mathScore", mathScore);

        UpdateResult updateResult = template.updateFirst(query, updateOps, Document.class, "mathScores");
        return (updateResult.getModifiedCount() > 0 ? true : false);
    }

    public List<Document> getHighScores() {


        SortOperation sort = Aggregation.sort(Sort.by(org.springframework.data.domain.Sort.Direction.DESC,"mathScore"));
        LimitOperation limit = Aggregation.limit(5);
        ProjectionOperation project = Aggregation.project("username", "mathScore").andExclude("_id");
        Aggregation pipeline = Aggregation.newAggregation(sort, limit, project);
        return template.aggregate(pipeline, "mathScores", Document.class).getMappedResults();

    }

    public Document getUserScore(String username) {


        MatchOperation matchType = Aggregation.match(Criteria.where("username").is(username));
        ProjectionOperation project = Aggregation.project("username", "mathScore").andExclude("_id");
        Aggregation pipeline = Aggregation.newAggregation(matchType, project);
        return template.aggregate(pipeline, "mathScores", Document.class).getMappedResults().get(0);

    }


}
