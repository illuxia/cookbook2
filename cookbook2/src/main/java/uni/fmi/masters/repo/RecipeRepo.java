package uni.fmi.masters.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uni.fmi.masters.bean.RecipeBean;
import uni.fmi.masters.bean.UserBean;

@Repository
public interface RecipeRepo extends JpaRepository<RecipeBean, Integer>{
	
	List<RecipeBean> findByUser(UserBean user);
	
	@Query(value = "SELECT * FROM RECIPE r WHERE LOWER(r.title) LIKE LOWER('%' || :keyword || '%') OR LOWER(r.description) LIKE LOWER('%' || :keyword || '%')", nativeQuery = true)
	//@Query(value = "SELECT * FROM RECIPE r WHERE title LIKE '%keyword%' OR description LIKE '%keyword%'", nativeQuery = true)
	List<RecipeBean> findByTitleAndDescriptionMatching(@Param("keyword") String keyword);
	
	// List<RecipeBean> findByTitleAndDescription(String keyword);
	
}
