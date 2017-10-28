<div class="entry-content wid-entry-content">
  <?php if( have_rows('what_i_do_field') ):
    while( have_rows('what_i_do_field') ): the_row();
    // vars
    $imageWID = get_sub_field('wid_image');
    $contentWID = get_sub_field('wid_content');
    ?>
      <div class="col-span-6">
        <img class="image-responsive wid-post-image" src="<?php echo $imageWID; ?>" />
      </div>
      <div class="col-span-6">
        <?php echo $contentWID; ?>
      </div>
  <?php endwhile; ?>
<?php endif; ?>
</div><!-- .wid-entry-content -->


<div class="entry-content mw-entry-content">
  <!--  <div id="mw-hp-carousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" role="listbox">
<?php /*
$myWorks = array( 'post_type' => 'my_work', 'posts_per_page' => 3 );
$loop = new WP_Query($myWorks);
while ( $loop -> have_posts() ) : $loop -> the_post(); ?>
    <div class="carousel-item">
        <img id="post-<?php the_ID(); ?>" <?php post_class() ?> src="<?php the_post_thumbnail_url(); ?>">
        <div class="carousel-caption">
            <h2> <?php the_title(); ?> </h2>
            <?php the_excerpt(); ?>
        </div>
    </div>
<?php
endwhile;
 */ ?> -->
      <!-- Controls
      <a class="left carousel-control" href="#mw-hp-carousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#mw-hp-carousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  -->
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="http://placehold.it/700x300&text=Slide_01" alt="...">
      <div class="carousel-caption">
        Caption Goes Here
      </div>
    </div>
    <div class="item">
      <img src="http://placehold.it/700x300&text=Slide_02" alt="...">
      <div class="carousel-caption">
        Caption Goes Here
      </div>
    </div>
    <div class="item">
      <img src="http://placehold.it/700x300&text=Slide_03" alt="...">
      <div class="carousel-caption">
        Caption Goes Here
      </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"><</span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true">></span>
    <span class="sr-only">Next</span>
  </a>
</div>
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
        </div>
      </div>
    </div>
    <?php endwhile;
    wp_reset_postdata();
    ?>
</div><!-- .mb-entry-content -->
