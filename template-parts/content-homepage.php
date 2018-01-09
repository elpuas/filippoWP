<div id="filiwid" class="entry-content wid-entry-content">
  <?php if( have_rows('what_i_do_field') ):
    while( have_rows('what_i_do_field') ): the_row();
    // vars
    $imageWID = get_sub_field('wid_image');
    $contentWID = get_sub_field('wid_content');
    ?>
    <div class="col-span-6">
        <img src="<?php echo $imageWID; ?>" class="img-responsive"/>
    </div>
    <div class="col-span-6">
        <?php echo $contentWID; ?>
    </div>
  <?php endwhile; ?>
<?php endif; ?>
<span id="filimwlink" class="arrow animated infinite pulse"></span>
</div><!-- .wid-entry-content -->
<div id="filimw" class="entry-content mw-entry-content">
  <div id="mw-hp-carousel" class="carousel slide carousel-fade col-span-8" data-ride="carousel">
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
                <?php // get The Terms|Category
                $terms = get_the_term_list( $post->ID, 'work_category', '', ',' );
                // $terms = get_the_terms($post->ID, 'work_category' ); // Get Taxonomy Array
                // $terms = esc_html( $terms[0]->name ); // Get Taxonomy Name
                echo '<h3>' . $terms . '</h3>';  // Print Result
                ?>
                <?php // Get the Terms|Tags
                $filiTags = get_the_term_list( get_the_ID(), 'work_tags', '', ',' ); // Get Tags List
                echo '<h4>' . $filiTags . '</h4>';  // Print Result
                ?>
                <?php // the_excerpt(); ?>
                <?php /*

                $posttags = get_the_tags();
                    if ($posttags) {
                      foreach($posttags as $tag) {
                        echo $tag->name . ' ';
                      }
                    }
                    *
                    */ ?>
                    <span class="filo-carousel--post-link"><a <?php post_class() ?> href="<?php the_permalink(); ?>"><img class="filo-carousel--post-link-image" src="<?php echo get_bloginfo('template_url') ?>/assets/img/open.svg"></a></span>
            </div><!-- carousel-caption -->

        </div><!-- .item #<?php the_ID(); ?> -->
    <?php
    $count++;
    endwhile;
      ?>
      <!-- Controls -->
      <div class="filo-carousel--controls">
      <a class="left carousel-control" data-target="#mw-hp-carousel" href="javascript:void(0)" role="button" data-slide="prev">
      <img src="<?php echo get_bloginfo('template_url') ?>/assets/img/arrow-left.svg">
      <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" data-target="#mw-hp-carousel" href="javascript:void(0)" role="button" data-slide="next">
      <img src="<?php echo get_bloginfo('template_url') ?>/assets/img/arrow-right.svg">
      <span class="sr-only">Next</span>
      </a>
    </div>
    </div><!-- .carousel-inner -->
  </div><!-- .carousel -->
  <span id="filimblink" class="arrow animated infinite pulse"></span>
</div><!-- .mw-entry-content -->


<div id="filimb" class="entry-content mb-entry-content">
    <?php
    $myBlog = array(
    'posts_per_page' => 3,
    'category_name' => 'blog');
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
