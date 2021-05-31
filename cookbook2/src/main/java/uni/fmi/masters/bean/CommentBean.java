package uni.fmi.masters.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "comment")
public class CommentBean {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "title", length = 250, nullable = false)
	private String title;
	
	@ManyToOne(fetch = FetchType.EAGER)
	//@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "user_id")
	//@JsonBackReference
	// @JsonIgnore
	private UserBean user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	//@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "recipe_id")
	@JsonBackReference
	// @JsonIgnore
	private RecipeBean recipe;

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the user
	 */
	public UserBean getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(UserBean user) {
		this.user = user;
	}

	public RecipeBean getRecipe() {
		return recipe;
	}

	public void setRecipe(RecipeBean recipe) {
		this.recipe = recipe;
	}

}
