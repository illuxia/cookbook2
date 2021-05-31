package uni.fmi.masters.bean;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name = "recipe")
public class RecipeBean {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "title", length = 250, nullable = false)
	private String title;
	
	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * @param image the image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}

	@Column(name = "description", length = 1000, nullable = false)
	private String description;
	
	@Column(name = "image", length = 1000, nullable = true)
	private String image;
	
	@ManyToOne(fetch = FetchType.EAGER)
	//@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "user_id")
	// @JsonBackReference
	// @JsonIgnore
	private UserBean user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	//@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "category_id")
	// @JsonBackReference
	private CategoryBean category;
	
	@OneToMany(orphanRemoval = true, mappedBy = "recipe", fetch = FetchType.LAZY)
	// @LazyCollection(LazyCollectionOption.FALSE)
	// @JsonIgnore
	@JsonManagedReference
	private List<CommentBean> comments;

	/**
	 * @return the comments
	 */
	public List<CommentBean> getComments() {
		return comments;
	}

	/**
	 * @param comments the comments to set
	 */
	public void setComments(List<CommentBean> comments) {
		this.comments = comments;
	}

	public CategoryBean getCategory() {
		return category;
	}

	public void setCategory(CategoryBean category) {
		this.category = category;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public UserBean getUser() {
		return user;
	}

	public void setUser(UserBean user) {
		this.user = user;
	}

}
