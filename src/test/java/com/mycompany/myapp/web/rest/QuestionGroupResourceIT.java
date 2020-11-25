package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.Application;
import com.mycompany.myapp.domain.QuestionGroup;
import com.mycompany.myapp.repository.QuestionGroupRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link QuestionGroupResource} REST controller.
 */
@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
@WithMockUser
public class QuestionGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    @Autowired
    private QuestionGroupRepository questionGroupRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionGroupMockMvc;

    private QuestionGroup questionGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionGroup createEntity(EntityManager em) {
        QuestionGroup questionGroup = new QuestionGroup()
            .name(DEFAULT_NAME)
            .order(DEFAULT_ORDER)
            .weight(DEFAULT_WEIGHT);
        return questionGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionGroup createUpdatedEntity(EntityManager em) {
        QuestionGroup questionGroup = new QuestionGroup()
            .name(UPDATED_NAME)
            .order(UPDATED_ORDER)
            .weight(UPDATED_WEIGHT);
        return questionGroup;
    }

    @BeforeEach
    public void initTest() {
        questionGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestionGroup() throws Exception {
        int databaseSizeBeforeCreate = questionGroupRepository.findAll().size();
        // Create the QuestionGroup
        restQuestionGroupMockMvc.perform(post("/api/question-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionGroup)))
            .andExpect(status().isCreated());

        // Validate the QuestionGroup in the database
        List<QuestionGroup> questionGroupList = questionGroupRepository.findAll();
        assertThat(questionGroupList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionGroup testQuestionGroup = questionGroupList.get(questionGroupList.size() - 1);
        assertThat(testQuestionGroup.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testQuestionGroup.getOrder()).isEqualTo(DEFAULT_ORDER);
        assertThat(testQuestionGroup.getWeight()).isEqualTo(DEFAULT_WEIGHT);
    }

    @Test
    @Transactional
    public void createQuestionGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questionGroupRepository.findAll().size();

        // Create the QuestionGroup with an existing ID
        questionGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionGroupMockMvc.perform(post("/api/question-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionGroup)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        List<QuestionGroup> questionGroupList = questionGroupRepository.findAll();
        assertThat(questionGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQuestionGroups() throws Exception {
        // Initialize the database
        questionGroupRepository.saveAndFlush(questionGroup);

        // Get all the questionGroupList
        restQuestionGroupMockMvc.perform(get("/api/question-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)));
    }
    
    @Test
    @Transactional
    public void getQuestionGroup() throws Exception {
        // Initialize the database
        questionGroupRepository.saveAndFlush(questionGroup);

        // Get the questionGroup
        restQuestionGroupMockMvc.perform(get("/api/question-groups/{id}", questionGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questionGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT));
    }
    @Test
    @Transactional
    public void getNonExistingQuestionGroup() throws Exception {
        // Get the questionGroup
        restQuestionGroupMockMvc.perform(get("/api/question-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionGroup() throws Exception {
        // Initialize the database
        questionGroupRepository.saveAndFlush(questionGroup);

        int databaseSizeBeforeUpdate = questionGroupRepository.findAll().size();

        // Update the questionGroup
        QuestionGroup updatedQuestionGroup = questionGroupRepository.findById(questionGroup.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionGroup are not directly saved in db
        em.detach(updatedQuestionGroup);
        updatedQuestionGroup
            .name(UPDATED_NAME)
            .order(UPDATED_ORDER)
            .weight(UPDATED_WEIGHT);

        restQuestionGroupMockMvc.perform(put("/api/question-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestionGroup)))
            .andExpect(status().isOk());

        // Validate the QuestionGroup in the database
        List<QuestionGroup> questionGroupList = questionGroupRepository.findAll();
        assertThat(questionGroupList).hasSize(databaseSizeBeforeUpdate);
        QuestionGroup testQuestionGroup = questionGroupList.get(questionGroupList.size() - 1);
        assertThat(testQuestionGroup.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testQuestionGroup.getOrder()).isEqualTo(UPDATED_ORDER);
        assertThat(testQuestionGroup.getWeight()).isEqualTo(UPDATED_WEIGHT);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestionGroup() throws Exception {
        int databaseSizeBeforeUpdate = questionGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc.perform(put("/api/question-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(questionGroup)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        List<QuestionGroup> questionGroupList = questionGroupRepository.findAll();
        assertThat(questionGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuestionGroup() throws Exception {
        // Initialize the database
        questionGroupRepository.saveAndFlush(questionGroup);

        int databaseSizeBeforeDelete = questionGroupRepository.findAll().size();

        // Delete the questionGroup
        restQuestionGroupMockMvc.perform(delete("/api/question-groups/{id}", questionGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionGroup> questionGroupList = questionGroupRepository.findAll();
        assertThat(questionGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
