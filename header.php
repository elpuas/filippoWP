<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Filippo
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="side-nav">
	<?php
		wp_nav_menu( array() );
	?>
	<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Menu Widget") ) : ?>
<?php endif;?>
</div>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'filippo' ); ?></a>
	<header id="masthead" class="site-header">
		<div class="site-branding">
			<h1>
			<?php the_custom_logo(); ?>
			<a class="logo-letters" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
		 </h1>
		</div><!-- .site-branding -->
	</header><!-- #masthead -->
	<div id="side-nav-mask"></div>
	<div id="content" class="site-content">
