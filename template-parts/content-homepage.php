<div class="entry-content wid-entry-content">
  <?php if( have_rows('what_i_do_field') ):
    while( have_rows('what_i_do_field') ): the_row();
    // vars
    $imageWID = get_sub_field('wid_image');
    $contentWID = get_sub_field('wid_content');
    ?>
      <!-- <div class="col-span-6">
        <img class="image-responsive wid-post-image" src="<?php echo $imageWID; ?>" />
      </div>
    -->
      <div class="col-span-6">
        <?php echo $contentWID; ?>
      </div>
  <?php endwhile; ?>
<?php endif; ?>
</div><!-- .wid-entry-content -->


<div class="entry-content mw-entry-content">
  <div id="mw-hp-carousel" class="carousel slide col-span-10" data-ride="carousel">
    <div class="carousel-inner" role="listbox">
    <?php
    $myWorks = array( 'post_type' => 'my_work', 'posts_per_page' => 3 );
    $loop = new WP_Query($myWorks);
    $count = 0;
    while ( $loop -> have_posts() ) : $loop -> the_post(); ?>
        <div class="item carousel-item<?php if($count == 0) { echo ' active'; } ?>">
          <div class="filo-carousel--img">
            <img id="post-<?php the_ID(); ?>" <?php post_class() ?> src="<?php the_post_thumbnail_url(); ?>">
          </div>
            <div class="carousel-caption">
                <h2> <?php the_title(); ?> </h2>
                <?php the_excerpt(); ?>
                <span class="filo-carousel--post-link"><a href="<?php the_permalink(); ?>"><img src="<?php echo get_bloginfo('template_url') ?>/assets/img/open.svg"></a></span>
            </div><!-- carousel-caption -->
        </div><!-- .item #<?php the_ID(); ?> -->
    <?php
    $count++;
    endwhile;
      ?>
      <!-- Controls -->
      <div class="filo-carousel--controls">
      <a class="left carousel-control" href="#mw-hp-carousel" role="button" data-slide="prev">
      <img src="<?php echo get_bloginfo('template_url') ?>/assets/img/arrow-left.svg">
      <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#mw-hp-carousel" role="button" data-slide="next">
      <img src="<?php echo get_bloginfo('template_url') ?>/assets/img/arrow-right.svg">
      <span class="sr-only">Next</span>
      </a>
    </div>
    </div><!-- .carousel-inner -->
  </div><!-- .carousel -->
</div><!-- .mw-entry-content -->


<div class="entry-content mb-entry-content">
    <?php
    $myBlog = array('post_per_page' => 3, 'category_name' => 'blog');
    $blogLoop = new WP_Query($myBlog);
    while ( $blogLoop -> have_posts() ) : $blogLoop -> the_post(); ?>
    <div class="col-span-6">
      <div id="post-<?php the_ID();?>" <?php post_class('mb-container') ?> style="background-image:url('<?php the_post_thumbnail_url(); ?>')">
        <div class="mb-meta-data">
          <h2> <?php the_title(); ?> </h2>
          <?php the_excerpt(); ?>
          <span><a href="<?php the_permalink(); ?>"><img src="<?php echo get_bloginfo('template_url') ?>/assets/img/open.svg"></a></span>
        </div>
      </div>
    </div>
    <?php endwhile;
    wp_reset_postdata();
    ?>
</div><!-- .mb-entry-content -->
