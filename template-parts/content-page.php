<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Filippo
 */

?>
<?php
global $post;
$post_slug=$post->post_name;?>
<!-- This page is <?php echo $post_slug ?> -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">

		<?php
		 if(is_home) {
         // No page title on Home
		 } else {
			 the_title( '<h1 class="entry-title">', '</h1>' );
     }
			 ?>
	</header><!-- .entry-header -->

	<div class="entry-content mc-entry-content">
		<?php
			the_content();
			the_post_thumbnail('full', array('class' => 'image-responsive'));
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'filippo' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .mc-content -->
	<?php if(is_home) { ?>
	<div class="entry-content wid-entry-content">
		<?php if( have_rows('what_i_do_field') ):
			while( have_rows('what_i_do_field') ): the_row();
			// vars
			$imageWID = get_sub_field('wid_image');
			$contentWID = get_sub_field('wid_content');
			?>
			<div class="wid-meta-data">
				<img class="image-responsive wid-post-image" src="<?php echo $imageWID; ?>" />
				<?php echo $contentWID; ?>
			</div>
		<?php endwhile; ?>
	<?php endif; ?>
</div><!-- .wid-entry-content -->
<div class="entry-content mw-entry-content">
	<?php
	$myWorks = array( 'post_type' => 'my_work', 'posts_per_page' => 3 );
	$loop = new WP_Query($myWorks);
	while ( $loop -> have_posts() ) : $loop -> the_post(); ?>
	<div class="mw-container">
		<div id="post-<?php the_ID(); ?>" <?php post_class() ?> style="background-image:url('<?php the_post_thumbnail_url(); ?>')">
		</div>
		<div class="mw-meta-data">
		<h2> <?php the_title(); ?> </h2>
		<?php the_excerpt(); ?>
		</div>
	</div>
	<?php
	endwhile;
	?>
</div><!-- .mw-entry-content -->
<div class="entry-content mb-entry-content">
<?php
 $myBlog = array('post_per_page' => 3, 'category_name' => 'blog');
 $blogLoop = new WP_Query($myBlog);
 while ( $blogLoop -> have_posts() ) : $blogLoop -> the_post(); ?>
 <div id="post-<?php the_ID();?>" <?php post_class('mb-container') ?> style="background-image:url('<?php the_post_thumbnail_url(); ?>')">
		<div class="mb-meta-data">
			<h2> <?php the_title(); ?> </h2>
			<?php the_excerpt(); ?>
		</div>
 </div>
 <?php endwhile;
	wp_reset_postdata();
 ?>
</div><!-- .mb-entry-content -->
	<?php } else {
			// Do Nothing
			} ?>
	<?php if ( get_edit_post_link() ) : ?>
		<footer class="entry-footer">
			<?php
				edit_post_link(
					sprintf(
						wp_kses(
							/* translators: %s: Name of current post. Only visible to screen readers */
							__( 'Edit <span class="screen-reader-text">%s</span>', 'filippo' ),
							array(
								'span' => array(
									'class' => array(),
								),
							)
						),
						get_the_title()
					),
					'<span class="edit-link">',
					'</span>'
				);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->
