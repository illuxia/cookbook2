package uni.fmi.masters.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uni.fmi.masters.bean.CommentBean;
import uni.fmi.masters.bean.UserBean;

@Repository
public interface CommentRepo extends JpaRepository<CommentBean, Integer> {
	
	List<CommentBean> findByUser(UserBean user);

}
