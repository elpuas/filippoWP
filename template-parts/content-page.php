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
		<div class="col-span-6">
		<?php
			the_content();
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'filippo' ),
				'after'  => '</div>',
			) );
			?>
		</div>
		<div class="col-span-6">
		<?php /* the_post_thumbnail('full', array('class' => 'image-responsive')); */ ?>
		</div>
	</div><!-- .mc-content -->
	<?php if(is_home) {
			get_template_part('template-parts/content-homepage');
	 } else {
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
