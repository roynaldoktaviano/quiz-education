<?php
function get_post_title_shortcode($atts) {
    $title_slug = sanitize_title_with_dashes(get_the_title());

    // Jika judul setelah disanitize adalah "promo-store", kembalikan kosong
    if ($title_slug === "special-promo-store") {
        return '';
    }

    // Jika tidak kosong, tampilkan dengan tanda "-"
    return '-' . $title_slug;
}
add_shortcode('get_title', 'get_post_title_shortcode');



function get_post_type_count($post_type) {
    $counts = wp_count_posts('user-manual');
    return $counts->publish;
}

add_shortcode('count_manuals', 'get_post_type_count');


function user_manual_cat(){
	$terms = get_terms([
    'taxonomy' => 'user-manual-category',
    'hide_empty' => true, 
]);

if (!empty($terms) && !is_wp_error($terms)) :
    $output = '<div class="list-kategori-produk">';
    foreach ($terms as $term) :
        $link = get_term_link($term);
		$gambar = get_field('category_image', 'user-manual-category' . $term->term_id); // Ambil gambar ACF
        $output .= '<div class="kategori-item"><a href="' . esc_url($link) . '">
		<img src="' . esc_url($gambar['url']) . '" alt="' . esc_attr($term->name) . '" />
		' . esc_html($term->name) . '</a></div>';
    endforeach;
    $output .= '</div>';
endif;
	return $output;
}

add_shortcode('user_manual_categories', 'user_manual_cat');

function custom_search_title_only( $search, $wp_query ) {
    global $wpdb;

    if ( ! $wp_query->is_search() || is_admin() ) {
        return $search;
    }

    // Ambil kata kunci dan pecah per kata
    $terms = $wp_query->query_vars['s'];
    $exploded = explode( ' ', $terms );
    $search = '';

    foreach ( $exploded as $term ) {
        $term = esc_sql( $wpdb->esc_like( $term ) );
        $search .= " AND ({$wpdb->posts}.post_title LIKE '%{$term}%')";
    }

    return $search;
}
add_filter( 'posts_search', 'custom_search_title_only', 10, 2 );

// Pastikan hanya cari produk
function search_products_only( $query ) {
    if ( ! is_admin() && $query->is_main_query() && $query->is_search() ) {
        $query->set( 'post_type', 'product' );
    }
}

// Shortcode untuk menampilkan kategori dari custom taxonomy "user_manual_category"
function show_user_manual_category_shortcode() {
    // Ambil post ID saat ini
    $post_id = get_the_ID();

    // Ambil terms/kategori berdasarkan taxonomy custom
    $terms = get_the_terms($post_id, 'user-manual-category');

    // Periksa apakah ada terms dan bukan error
    if (!empty($terms) && !is_wp_error($terms)) {
        // Ambil nama-nama kategori saja
        $names = wp_list_pluck($terms, 'name');

        // Kembalikan sebagai string dipisahkan koma
        return implode(', ', $names);
    }

    return ''; // Kosongkan jika tidak ada kategori
}
add_shortcode('user_manual_category', 'show_user_manual_category_shortcode');


// Shortcode handler
add_shortcode('acf_faq_group', 'render_acf_faq_group');

function render_acf_faq_group() {
    ob_start();

    $faq_id = get_field('frequently_asked_question'); // Bahasa Indonesia
    $faq_en = get_field('frequently_asked_question_english'); // Bahasa Inggris

    // Deteksi apakah ada FAQ sama sekali
    $has_faq = false;
    for ($i = 1; $i <= 10; $i++) {
        if (!empty($faq_id["question_$i"]) || !empty($faq_en["question_$i"])) {
            $has_faq = true;
            break;
        }
    }

    if ($has_faq): ?>
<div class="faq-language-switcher">
    <button type="button" class="lang-btn active" data-lang="id">Indonesian</button>
    <button type="button" class="lang-btn" data-lang="en">English</button>
</div>

<div class="acf-faq-accordion" id="faq-id">
    <?php for ($i = 1; $i <= 10; $i++):
                $q = $faq_id["question_$i"] ?? '';
                $a = $faq_id["answer_$i"] ?? '';
                if (!empty($q) && !empty($a)): ?>
    <div class="accordion-item">
        <input type="checkbox" id="faq-id-toggle-<?php echo $i; ?>" class="accordion-toggle">
        <label class="accordion-button" for="faq-id-toggle-<?php echo $i; ?>">
            <?php echo esc_html($q); ?>
            <span class="icon">&#x25BC;</span>
        </label>
        <div class="accordion-content">
            <p><?php echo nl2br(esc_html($a)); ?></p>
        </div>
    </div>
    <?php endif;
            endfor; ?>
</div>

<div class="acf-faq-accordion" id="faq-en" style="display: none;">
    <?php for ($i = 1; $i <= 10; $i++):
                $q = $faq_en["question_$i"] ?? '';
                $a = $faq_en["answer_$i"] ?? '';
                if (!empty($q) && !empty($a)): ?>
    <div class="accordion-item">
        <input type="checkbox" id="faq-en-toggle-<?php echo $i; ?>" class="accordion-toggle">
        <label class="accordion-button" for="faq-en-toggle-<?php echo $i; ?>">
            <?php echo esc_html($q); ?>
            <span class="icon">&#x25BC;</span>
        </label>
        <div class="accordion-content">
            <p><?php echo nl2br(esc_html($a)); ?></p>
        </div>
    </div>
    <?php endif;
            endfor; ?>
</div>

<style>
.faq-language-switcher {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.lang-btn {
    padding: 8px 16px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}

.lang-btn.active {
    background: orange;
    color: #fff;
    border-color: orange;
}

.acf-faq-accordion {
    font-family: "Plus Jakarta Sans", sans-serif;
}

.accordion-item {
    margin-bottom: 20px;
}

.accordion-toggle {
    display: none;
}

.accordion-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    cursor: pointer;
    border: 1px solid #d2d2d2;
    font-weight: 600;
    background-color: #f9f9f9;
    border-radius: 8px;
    transition: background-color 0.3s;
    box-sizing: border-box;
    font-size: 1rem;
}

.accordion-button:hover {
    background-color: #eee;
}

.accordion-button .icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s ease;
    padding: 0 20px;
    background: #fff;
    font-size: 0.95rem;
    line-height: 1.6;
    border-radius: 0 0 8px 8px;
}

.accordion-content p {
    margin: 16px 0;
    padding-bottom: 0;
}

.accordion-toggle:checked~.accordion-content {
    max-height: 500px;
    padding: 16px 20px;
}

.accordion-toggle:checked+.accordion-button {
    border: 1px solid orange;
}

.accordion-toggle:checked+.accordion-button .icon {
    transform: rotate(180deg);
}

@media (max-width: 768px) {
    .accordion-button {
        font-size: 0.95rem;
        padding: 12px 16px;
    }

    .accordion-content {
        font-size: 0.9rem;
        padding: 0 16px;
    }

    .accordion-toggle:checked~.accordion-content {
        padding: 14px 16px;
    }
}

@media (max-width: 480px) {
    .accordion-button {
        font-size: 0.9rem;
        padding: 10px 14px;
    }

    .accordion-content {
        font-size: 0.85rem;
        padding: 0 14px;
    }

    .accordion-toggle:checked~.accordion-content {
        padding: 12px 14px;
    }

    .accordion-button .icon {
        font-size: 1rem;
    }

    .acf-faq-accordion {
        padding: 0;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.lang-btn');
    const faqID = document.getElementById('faq-id');
    const faqEN = document.getElementById('faq-en');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.lang === 'id') {
                faqID.style.display = 'block';
                faqEN.style.display = 'none';
            } else {
                faqID.style.display = 'none';
                faqEN.style.display = 'block';
            }
        });
    });
});
</script>
<?php else: ?>
<p>FAQ belum tersedia.</p>
<?php endif;

    return ob_get_clean();
}



function get_youtube_title($url, $api_key) {
    $video_id = null;

    // Format: watch?v=abc123
    parse_str(parse_url($url, PHP_URL_QUERY), $params);
    if (isset($params['v'])) {
        $video_id = $params['v'];
    }

    // Format: youtu.be/abc123
    if (!$video_id && preg_match('/youtu\.be\/([^\?]+)/', $url, $match)) {
        $video_id = $match[1];
    }

    // Format: youtube.com/embed/abc123
    if (!$video_id && preg_match('/youtube\.com\/embed\/([^\?]+)/', $url, $match)) {
        $video_id = $match[1];
    }

    if (!$video_id) return null;

    // Ambil dari YouTube API
    $api_url = "https://www.googleapis.com/youtube/v3/videos?id={$video_id}&key={$api_key}&part=snippet";
    $response = wp_remote_get($api_url);

    if (is_wp_error($response)) return null;

    $body = json_decode(wp_remote_retrieve_body($response), true);
    return $body['items'][0]['snippet']['title'] ?? null;
}


// Shortcode untuk menampilkan galeri video
function video_gallery_shortcode() {
    ob_start(); 
    $group = get_field('video_gallery'); // Ambil group field ACF

    $api_key = 'AIzaSyBD-CSGpZYPy-MDyr4OoF20GC_zLwaifNU'; // GANTI dengan API key YouTube milikmu
    $videos = [];

    for ($i = 1; $i <= 10; $i++) {
        $video_key = 'video_' . $i;

        if (!empty($group[$video_key])) {
            $url = $group[$video_key];
            $title = null;

            if (strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false) {
                $title = get_youtube_title($url, $api_key);
            }

            $videos[] = [
                'url' => $url,
                'title' => $title
            ];
        }
    }

    if ($videos): ?>
<div class="video-gallery">
    <?php foreach ($videos as $video): ?>
    <div class="video-item">
        <?php if (strpos($video['url'], 'youtube.com') !== false || strpos($video['url'], 'youtu.be') !== false): ?>
        <iframe src="<?php echo esc_url($video['url']); ?>" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <?php else: ?>
        <iframe src="<?php echo esc_url($video['url']); ?>" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        <?php endif; ?>

        <?php if (!empty($video['title'])): ?>
        <p class="video-title"><?php echo esc_html($video['title']); ?></p>
        <?php endif; ?>
    </div>
    <?php endforeach; ?>
</div>

<style>
.video-gallery {
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;
    gap: 20px;
    width: 100%;
}

.video-item iframe,
.video-item video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
}

.video-title {
    margin-top: 8px;
    font-size: 14px !important;
    text-align: center;
    color: #333;
    font-weight: bold !important;
    font-family: "Plus Jakarta Sans" !important;
}

@media (max-width: 768px) {
    .video-gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .video-gallery {
        grid-template-columns: 1fr;
    }
}
</style>
<?php else: ?>
<p>Video belum tersedia.</p>
<?php endif;

    return ob_get_clean();
}
add_shortcode('acf_video_gallery', 'video_gallery_shortcode');


// Enqueue Swiper assets
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], null, true);
});

// Shortcode: [product_category_carousel_grid]
add_shortcode('product_category_carousel_grid', 'render_product_category_carousel_grid');

function render_product_category_carousel_grid() {
	$desired_ids = [2748, 2948, 2773, 3183, 2756,2754 ,  1832,1821, 1827,1044,1071 , 1050, 1029, 1830, 2714, 1825, 1051, 1024, 1833, 1046,954];

$args = array(
    'taxonomy'   => 'product_cat',
    'include'    => $desired_ids,
    'orderby'    => 'include',
    'hide_empty' => true,
);

$raw_terms = get_terms($args);

// ✅ Rekonstruksi urutan berdasarkan $desired_ids
$categories = [];
$term_map = [];
$term_id = get_queried_object_id(); 
$isNew = get_field('kategori_baru', 'product_cat_' . $category->term_id);
// 	var_dump($isNew);
foreach ($raw_terms as $term) {
    $term_map[$term->term_id] = $term;
}
foreach ($desired_ids as $id) {
    if (isset($term_map[$id])) {
        $categories[] = $term_map[$id];
    }
}


    if (empty($categories)) {
        return '<p>Tidak ada kategori ditemukan.</p>';
    }

    $chunks  = array_chunk($categories, 7); // Desktop
    $chunkM  = array_chunk($categories, 7); // Mobile

    ob_start(); ?>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

.swiper {
    width: 100%;
    padding: 20px 0;
}

.swiper-slide {
    display: flex;
    justify-content: center;
}

.badgeNew {
    font-size: 12px !important;
    background: green !important;
    color: white !important;
    width: fit-content !important;
    height: fit-content !important;
    padding: 3px 14px !important;
    border-radius: 6px !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    animation: blinkBadge 1.5s infinite;
}

@keyframes blinkBadge {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

.product-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
    width: 100%;
    max-width: 1200px;
    margin: 0 40px;
}

.product-category-card {
    border: 1px solid #f4f4f4 !important;
    background: #f4f4f4 !important;
    padding: 12px 18px;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: grid;
    grid-template-columns: 60% 40%;
    text-decoration: none;
    color: inherit;
}

.product-category-card:hover {
    border: 1px solid orange !important;
}

.product-category-card:hover img {
    transform: scale(1.1);
}

.product-category-card img {
    width: 40%;
    max-height: 150px;
    height: 150px;
    transition: all 0.3s ease;
    object-fit: contain;
    margin-top: auto;
    grid-column: span 2;
    justify-self: flex-end;
}

.product-category-card.featured img {
    width: 100%;
    min-height: 260px;
    max-height: 220px;
    margin: 0;
    transition: all 0.3s ease;
    object-fit: contain;
}


.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 14px !important;
    background-color: orange !important;
    color: white !important;
    padding: 8px 12px;
    border-radius: 999px;
}

.prodCount {
    padding: 0;
    margin-top: 2px !important;
    font-size: 13px !important;
    color: gray !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    padding-bottom: 6px !important;
}

.product-category-card.featured {
    grid-row: span 2;
    display: flex;
    flex-direction: column;
    padding: 18px;
}

.product-category-card.featured .text {
    padding-left: 18px !important;
    padding-right: 18px !important;
}

.swiper-wrapper {
    margin-bottom: 20px;
}

.swiper-pagination-bullet-active {
    background: orange !important;
}

.titleCat {
    font-size: 13px !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    padding: 0 !important;
    margin: 0 !important;
}

.productTitle {
    padding-left: 18px;
    position: absolute;
}

.mobile-category-grid {
    display: none;
}

@media (max-width: 768px) {
    .mySwiper-desktop {
        display: none;
    }

    .mySwiper-mobile {
        display: block;
    }

    .mobile-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        padding: 16px;
        margin: 0 !important;
    }

    .product-category-card {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 12px !important;
        border: 1px solid #ddd;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        background-size: 15vw !important;
        background-repeat: no-repeat !important;
        background-position: 20vw 10vh !important;
        min-height: 125px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

    }

    .product-category-card.featured-mobile {
        grid-row: span 2;
        min-height: 240px;
        background-size: 38vw !important;
        background-repeat: no-repeat !important;
        background-position: 0px 10vh !important;
    }

    .product-category-card .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        /* Dark overlay */
        border-radius: 12px;
        z-index: 1;
    }

    .product-category-card .text {
        position: relative;
        z-index: 2;
    }

    .titleCat {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
    }

    .prodCount {
        font-size: 12px;
        margin-top: 4px;
    }

    .badgeNew {
        font-size: 9px !important;
        padding: 2px 12px !important;
        margin-bottom: 6px !important;
    }
}




@media (min-width: 769px) {
    .mySwiper-desktop {
        display: block;
    }

    .mySwiper-mobile {
        display: none;
    }
}
</style>

<!-- DESKTOP CAROUSEL -->
<div class="swiper mySwiper-desktop">
    <div class="swiper-wrapper">
        <?php foreach ($chunks as $chunk): ?>
        <div class="swiper-slide">
            <div class="product-category-grid">
                <?php foreach ($chunk as $index => $category): 
                            $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
                            $image_url = wp_get_attachment_url($thumbnail_id);
							$term_id = get_queried_object_id(); 
							$isNew = get_field('kategori_baru', 'product_cat_' . $category->term_id);
                            $count = $category->count;
                            $is_featured = $index === 0;
                            $link = get_term_link($category);
                        ?>
                <a href="<?php echo esc_url($link); ?>"
                    class="product-category-card <?php echo $is_featured ? 'featured' : ''; ?>">
                    <?php if ($is_featured): ?>
                    <div class="text">

                        <h3 class="titleCat"><?php echo esc_html($category->name); ?></h3>
                        <p class="prodCount"><?php echo esc_html($count); ?> Products</p>
                        <?php if ($isNew): ?>
                        <p class="badgeNew">Kategori Baru</p>
                        <?php endif; ?>
                    </div>
                    <?php if ($image_url): ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($category->name); ?>" />
                    <?php endif; ?>

                    <?php else: ?>
                    <div class="productTitle">

                        <h3 class="titleCat"><?php echo esc_html($category->name); ?></h3>
                        <p class="prodCount"><?php echo esc_html($count); ?> Products</p>
                        <?php if ($isNew): ?>
                        <p class="badgeNew">Kategori Baru</p>
                        <?php endif; ?>
                    </div>
                    <?php if ($image_url): ?>
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($category->name); ?>" />
                    <?php endif; ?>
                    <?php if (is_array($isNew) && in_array('Kategori Baru', array_map('strtolower', $isNew))): ?>
                    <p>Produk Baru</p>
                    <?php endif; ?>
                    <?php endif; ?>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>

<!-- MOBILE CAROUSEL -->
<div class="swiper mySwiper-mobile">
    <div class="swiper-wrapper">
        <?php foreach ($chunks as $chunk): ?>

        <div class="swiper-slide">
            <div class="product-category-grid mobile-grid">
                <?php foreach ($chunk as $index => $category): 
            $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
            $image_url = wp_get_attachment_url($thumbnail_id);
			$isNew = get_field('kategori_baru', 'product_cat_' . $category->term_id);
            $count = $category->count;
            $link = get_term_link($category);
            $is_featured = $index === 0;
          ?>
                <a href="<?php echo esc_url($link); ?>"
                    class="product-category-card <?php echo $is_featured ? 'featured-mobile' : ''; ?>"
                    style="background-image: url('<?php echo esc_url($image_url); ?>') !important;">
                    <div class="text">
                        <?php if ($isNew): ?>
                        <p class="badgeNew">Kategori Baru</p>
                        <?php endif; ?>
                        <h3 class="titleCat"><?php echo esc_html($category->name); ?></h3>
                        <p class="prodCount"><?php echo esc_html($count); ?> Products</p>

                    </div>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>





<!-- SwiperJS Init -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".mySwiper-desktop", {
        loop: true,
        spaceBetween: 40,
        slidesPerView: 1,
        pagination: {
            el: ".mySwiper-desktop .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".mySwiper-desktop .swiper-button-next",
            prevEl: ".mySwiper-desktop .swiper-button-prev",
        },
    });

    new Swiper(".mySwiper-mobile", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
            el: ".mySwiper-mobile .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".mySwiper-mobile .swiper-button-next",
            prevEl: ".mySwiper-mobile .swiper-button-prev",
        },
    });
});
</script>

<?php
    return ob_get_clean();
}

// Enqueue Lightbox2 dari CDN (tanpa plugin)
function enqueue_lightbox_assets_custom() {
    wp_enqueue_style('lightbox2', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css');
    wp_enqueue_script('lightbox2', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_lightbox_assets_custom');

// Shortcode function
function render_user_manual_gallery_lightbox() {
    $post_id = get_the_ID();
    if (!$post_id) return '';

    // Ambil Photo Gallery (dari plugin)
    $gallery = get_field('user_manual_english', $post_id);
    $default_group = get_field('default_english', $post_id);

    $output = '
	<style>
		.user-manual-gallery {
			display: flex;
			flex-wrap: wrap;
			gap: 14px;
			justify-content: flex-start;
		}

		.image-user-manual {
			width: 210px;
			height: auto;
			object-fit: contain;
			border-radius: 6px;
		}

		/* Responsive: ubah ukuran gambar berdasarkan lebar layar */

		@media (max-width: 768px) {
			.user-manual-gallery {
				justify-content: center;
			}
			.image-user-manual {
				width: 45%;
			}
		}

		@media (max-width: 480px) {
			.image-user-manual {
				width: 100%;
			}
		}
		</style>
	<div class="user-manual-gallery">';

    // Tampilkan image dari Photo Gallery (full-size supaya tidak burem)
    if (!empty($gallery) && is_array($gallery)) {
        foreach ($gallery as $image) {
            if (!empty($image['full_image_url'])) {
                $full = esc_url($image['full_image_url']);
                $thumb = $full; // pakai full juga sebagai thumbnail biar tajam

                $output .= '<a href="' . $full . '" data-lightbox="manual-gallery" style="display:inline-block;">
                    <img class="image-user-manual" src="' . $thumb . '" alt="" >
                </a>';
            }
        }
    }

    // Tambahkan default images dari group jika ada
    if (!empty($default_group) && is_array($default_group)) {
        foreach (['default_image_1', 'default_image_2', 'default_image_3', 'default_image_4'] as $key) {
            if (!empty($default_group[$key])) {
                $url = esc_url($default_group[$key]);
                $output .= '<a href="' . $url . '" data-lightbox="manual-gallery" style="display:inline-block;">
                    <img class="image-user-manual" src="' . $url . '" alt="Default Image">
                </a>';
            }
        }
    }

    $output .= '</div>';
    return $output;
}
add_shortcode('user_manual_gallery', 'render_user_manual_gallery_lightbox');

// Shortcode function
function render_user_manual_gallery_id() {
    $post_id = get_the_ID();
    if (!$post_id) return '';

    // Ambil Photo Gallery (dari plugin)
    $gallery = get_field('user_manual_indonesia', $post_id);
    $default_group = get_field('default_indonesia', $post_id);

    $output = '
	
	<style>
		.user-manual-gallery {
			display: flex;
			flex-wrap: wrap;
			gap: 14px;
			justify-content: flex-start;
		}

		.image-user-manual {
			width: 210px;
			height: auto;
			object-fit: contain;
			border-radius: 6px;
		}

		/* Responsive: ubah ukuran gambar berdasarkan lebar layar */

		@media (max-width: 768px) {
			.user-manual-gallery {
				justify-content: center;
			}
			.image-user-manual {
				width: 45%;
			}
		}

		@media (max-width: 480px) {
			.image-user-manual {
				width: 100%;
			}
		}
		</style>
		
	<div class="user-manual-gallery">';

    // Tampilkan image dari Photo Gallery (full-size supaya tidak burem)
    if (!empty($gallery) && is_array($gallery)) {
        foreach ($gallery as $image) {
            if (!empty($image['full_image_url'])) {
                $full = esc_url($image['full_image_url']);
                $thumb = $full; // pakai full juga sebagai thumbnail biar tajam

                $output .= '<a href="' . $full . '" data-lightbox="manual-gallery" style="display:inline-block;">
                    <img class="image-user-manual" src="' . $thumb . '" alt="" >
                </a>';
            }
        }
    }

    // Tambahkan default images dari group jika ada
    if (!empty($default_group) && is_array($default_group)) {
        foreach (['default_image_1', 'default_image_2', 'default_image_3', 'default_image_4'] as $key) {
            if (!empty($default_group[$key])) {
                $url = esc_url($default_group[$key]);
                $output .= '<a href="' . $url . '" data-lightbox="manual-gallery" style="display:inline-block;">
                    <img class="image-user-manual" src="' . $url . '" alt="Default Image">
                </a>';
            }
        }
    }

    $output .= '</div>';
    return $output;
}
add_shortcode('user_manual_gallery_id', 'render_user_manual_gallery_id');


add_shortcode('external_product_reviews', function () {
    if (!is_product()) return 'Shortcode ini hanya untuk halaman produk.';

    ob_start();

    $product = wc_get_product(get_the_ID());
    if (!$product) return '<p>Produk tidak ditemukan.</p>';

    // Ambil semua ID variant
    $variant_ids = [];
    if ($product->is_type('variable')) {
        $children = $product->get_children();
        if ($children) $variant_ids = $children;
    }

    $all_ids = array_merge([$product->get_id()], $variant_ids);

    $reviews = [];
    foreach ($all_ids as $pid) {
        $api_response = wp_remote_get("https://kasir.doran.id/api/item_review/{$pid}?type=jete_id", ['timeout' => 10]);
        if (!is_wp_error($api_response)) {
            $body = wp_remote_retrieve_body($api_response);
            $data = json_decode($body, true);
            $group = $data['data']['group_by_star'] ?? [];
            foreach ($group as $g) {
                if (!empty($g['data'])) $reviews = array_merge($reviews, $g['data']);
            }
        }
    }

    if (empty($reviews)) {
        echo '<p>Belum ada review untuk produk ini.</p>';
        return ob_get_clean();
    }

    function maskName($fullName) {
        if (!$fullName) return 'Anonim';
        $parts = explode(' ', trim($fullName));
        if (count($parts) === 1) return substr($parts[0],0,1).'***';
        return $parts[0].' '.substr($parts[1],0,1).'***';
    }

    // Filter review unik (skip duplicate konten)
    $uniqueReviews = [];
    $seenContents = [];
    foreach ($reviews as $r) {
        $content = $r['ulasan'] ?? '';
        if ($content && in_array($content, $seenContents)) continue;
        if ($content) $seenContents[] = $content;
        $uniqueReviews[] = $r;
    }

    // hitung summary
    $starsMap = [];
    $totalStars = 0;
    foreach ($uniqueReviews as $r) {
        $s = (int)($r['star'] ?? 0);
        $starsMap[$s] = ($starsMap[$s] ?? 0) + 1;
        $totalStars += $s;
    }

    $totalRating = count($uniqueReviews);
    $avg = $totalRating ? number_format($totalStars / $totalRating, 1) : 0;
    ?>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

.review-summary {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 10px;
    font-family: "Plus Jakarta Sans", sans-serif !important;
}

.review-bars {
    flex: 2;
}

.review-bars .bar {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    font-size: 14px;
    cursor: pointer;
}

.review-bars .bar span {
    width: 40px;
}

.bar-graph {
    flex: 1;
    height: 8px;
    background: #eee;
    border-radius: 10px;
    margin: 0 10px;
    position: relative;
    overflow: hidden;
}

.bar-fill {
    height: 100%;
    background-color: #FFD700;
    border-radius: 10px;
}

.review-average {
    flex: 1;
    text-align: center;
    align-content: center;
    border: 1px solid red;
    background: #d61e3117;
    border-radius: 4px;
}

.avgrev {
    font-size: 40px !important;
    margin: 0 !important;
    color: #d61e31 !important;
    padding: 0 !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    font-weight: bold !important;
    line-height: 1em !important;
}

.review-average .stars {
    font-size: 22px;
    color: #FFD700;
}

.single-review {
    border-radius: 10px;
    margin-bottom: 20px;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    padding: 10px 25px;
    background: #00000008;
}

.single-review strong {
    font-size: 16px;
}

.single-review .stars {
    color: #FFD700;
    font-size: 20px;
}

.totalRating {
    font-size: 12px !important;
    font-weight: bold !important;
}

.dataDiri {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 12px 0;
}

.wallpaperUlasan {
    width: 40px;
    height: 30px;
    border-radius: 999px;
    border: 1px solid red;
}

.tglReview {
    padding: 0 !important;
    margin: 0;
    font-size: 12px !important;
    color: gray !important;
    font-family: 'Plus Jakarta Sans' !important;
}

.contentReview {
    font-size: 16px !important;
    font-family: 'Plus Jakarta Sans' !important;
}

.namaReview {
    font-size: 14px !important;
}
</style>

<div id="external-review-container">
    <div class="review-summary">
        <div class="review-bars">
            <?php for ($i=5;$i>=1;$i--):
                    $itemTotal = $starsMap[$i] ?? 0;
                    $percentage = $totalRating ? number_format($itemTotal / $totalRating * 100, 1) : 0; ?>
            <div class="bar" data-star="<?php echo $i; ?>">
                <span><?php echo $i; ?> ★</span>
                <div class="bar-graph">
                    <div class="bar-fill" style="width:<?php echo $percentage; ?>%;"></div>
                </div>
                <span><?php echo $itemTotal; ?></span>
            </div>
            <?php endfor; ?>
        </div>
        <div class="review-average">
            <p class="avgrev"><?php echo $avg; ?></p>
            <div class="stars"><?php echo str_repeat('★', round($avg)).str_repeat('☆', 5-round($avg)); ?></div>
            <div class="totalRating"><?php echo $totalRating; ?> Ratings</div>
        </div>
    </div>

    <div id="review-list">
        <?php foreach ($uniqueReviews as $review):
                $name = maskName($review['user']['name'] ?? null);
                $avatar = !empty($review['user']['avatar']) ? 'https://kasir.doran.id/'.$review['user']['avatar'] : 'https://dorangadget.com/wp-content/uploads/2025/07/avatar-revi-scaled.jpg';
                $star = (int)($review['star'] ?? 0);
                $content = $review['ulasan'] ?? '';
                $date = isset($review['created_at']) ? date_i18n('j F Y', strtotime($review['created_at'])) : '';
                ?>
        <div class="single-review" data-star="<?php echo $star; ?>">
            <div class="stars"><?php echo str_repeat('★',$star).str_repeat('☆',5-$star); ?></div>
            <?php if($content): ?><p class="contentReview"><?php echo $content; ?></p><?php endif; ?>
            <div class="dataDiri">
                <img class="wallpaperUlasan" src="<?php echo $avatar; ?>" alt="<?php echo $name; ?>" />
                <div><strong class="namaReview"><?php echo $name; ?></strong><br>
                    <p class="tglReview"><?php echo $date; ?></p>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    $('.review-bars .bar').click(function() {
        const star = $(this).data('star');
        if (star) {
            $('#review-list .single-review').hide().filter('[data-star="' + star + '"]').show();
            // update total rating
            const count = $('#review-list .single-review[data-star="' + star + '"]').length;
            $('.totalRating').text(count + ' Ratings');
        } else {
            $('#review-list .single-review').show();
            $('.totalRating').text($('#review-list .single-review').length + ' Ratings');
        }
    });
});
</script>

<?php
    return ob_get_clean();
});


// Tambahkan tombol See More/See Less pada deskripsi panjang produk WooCommerce
add_action('woocommerce_after_single_product', 'custom_add_see_more_button_description', 5);
function custom_add_see_more_button_description() {
    ?>
<style>
.short-description-wrapper {
    max-height: 200px;
    overflow: hidden;
    position: relative;
    transition: max-height 0.3s ease;
}

.short-description-wrapper.expanded {
    max-height: none;
}

.short-description-wrapper::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to bottom, transparent, white);
    /* warna putih gradasi */
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.short-description-wrapper.expanded::after {
    opacity: 0;
}

.see-more-button {
    display: block;
    margin: 15px auto 0;
    /*         color: #1eb4b4; */
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    background: none;
    border: none;
    font-size: 14px;
    font-family: 'Plus Jakarta Sans';
    background: orange;
    border-radius: 4px;
    color: white;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.woocommerce-Tabs-panel--description');
    if (!wrapper) return;

    const content = wrapper.innerHTML;

    const inner = document.createElement('div');
    inner.classList.add('short-description-wrapper');
    inner.innerHTML = content;

    wrapper.innerHTML = '';
    wrapper.appendChild(inner);

    const button = document.createElement('button');
    button.className = 'see-more-button';
    button.innerText = 'Lihat Selengkapnya';

    button.addEventListener('click', function() {
        inner.classList.toggle('expanded');
        button.innerText = inner.classList.contains('expanded') ? 'Lebih Sedikit' :
            'Lihat Selengkapnya';
    });

    wrapper.appendChild(button);
});
</script>
<?php
}

// Shortcode untuk menampilkan related products
function custom_related_products_shortcode( $atts ) {
    global $product;

    if ( ! is_a( $product, 'WC_Product' ) ) {
        return '<p>No related products found.</p>';
    }

    // Ambil related products (default WooCommerce)
    $related_ids = wc_get_related_products( $product->get_id(), 4 ); // 4 produk terkait

    if ( empty( $related_ids ) ) {
        return '<p>No related products found.</p>';
    }

    // Query related products
    $args = array(
        'post_type'      => 'product',
        'post__in'       => $related_ids,
        'posts_per_page' => 4,
    );

    $query = new WP_Query( $args );

    ob_start();

    if ( $query->have_posts() ) : ?>
<ul class="products columns-4">
    <?php while ( $query->have_posts() ) : $query->the_post(); ?>
    <?php wc_get_template_part( 'content', 'product' ); ?>
    <?php endwhile; ?>
</ul>
<?php endif;

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode( 'related_products_card', 'custom_related_products_shortcode' );


add_action('wp_footer', 'add_schema_price_to_woocommerce_product', 99);
function add_schema_price_to_woocommerce_product() {
    if (is_product()) {
        global $product;

        if (!$product) return;

        $data = [
            "@context" => "https://schema.org/",
            "@type" => "Product",
            "name" => $product->get_name(),
            "image" => wp_get_attachment_url($product->get_image_id()),
            "description" => wp_strip_all_tags($product->get_short_description()),
            "brand" => [
                "@type" => "Brand",
                "name" => "JETE"
            ],
            "offers" => [
                "@type" => "Offer",
                "priceCurrency" => "IDR",
                "price" => $product->get_price(),
                "availability" => $product->is_in_stock() ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "url" => get_permalink($product->get_id())
            ]
        ];

        echo '<script type="application/ld+json">' . wp_json_encode($data) . '</script>';
    }
}


function custom_latest_products_card_shortcode($atts) {
    $atts = shortcode_atts([
        'count' => 20, // Jumlah produk terbaru yang ditampilkan
    ], $atts, 'latest_products_card');

   $args = [
    'post_type'      => 'product',
    'posts_per_page' => intval($atts['count']),
    'orderby'        => 'date',
    'order'          => 'DESC',
    'tax_query'      => [
        [
            'taxonomy' => 'product_cat',
            'field'    => 'name', // atau 'slug' kalau kamu pakai slug
            'terms'    => 'Bundling Starterpack',
        ],
    ],
];
    $products = new WP_Query($args);
    if (!$products->have_posts()) return '<p>Tidak ada produk terbaru.</p>';

    ob_start();

    echo '<style>
    @media (max-width: 768px) {
      .latest-products-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 480px) {
      .latest-products-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    .latest-products-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
    }
    .latest-product-card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
      transition: transform 0.2s ease !important;
      background: white;
      text-decoration: none;
      display: block;
      overflow: hidden;
    }
    .latest-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .latest-product-card img {
      width: 100%;
      border-radius: 8px;
    }
    .latest-product-card .product-content {
      padding: 12px;
    }
    .latest-product-card h3 {
      font-size: 16px !important;
      font-weight: 600 !important;
      margin-top: 0 !important;
      color: #111827 !important;
      line-height: 1.4 !important;
      font-family: "Plus Jakarta Sans" !important;
    }
    .latest-product-card p {
      font-family: "Plus Jakarta Sans" !important;
      display: flex;
      flex-direction: column;
    }
	.badge-selling {
	margin-bottom: 10px;
	}
    </style>';

    echo '<div class="latest-products-grid">';

    while ($products->have_posts()) {
        $products->the_post();
        $product = wc_get_product(get_the_ID());
        if (!$product || !$product->is_visible()) continue;

        $permalink = get_permalink($product->get_id());
        $title = $product->get_name();
        $image_url = wp_get_attachment_image_url($product->get_image_id(), 'medium');

        $price_html = '';
        $badge_html = '';
        $free_shipping = false;

        if ($product->is_type('variable')) {
            $variations = $product->get_available_variations();
            $prices = array_column($variations, 'display_price');
            $regulars = array_column($variations, 'display_regular_price');

            if (empty($prices)) continue;

            $min_price = min($prices);
            $max_price = max($prices);
            $min_regular = min($regulars);
            $max_regular = max($regulars);

            $is_same = $min_price === $max_price;

            if ($min_regular > $min_price) {
                $discount = round((($min_regular - $min_price) / $min_regular) * 100);
                $badge_html = '<div style="position: absolute; top: 0px; background-color: #dc2626; color: white; font-size: 12px; padding: 0px 12px; border-radius: 0 0px 4px 0; font-weight: bold;">- ' . $discount . '%</div>';
                $price_html = '<del style="color:#6b7280; font-size:12px;">' . wc_price($min_regular) . '</del> 
                               <ins style="text-decoration: none; color: #059669;">' . wc_price($min_price) . '</ins>';
            } else {
                $price_html = '<span style="color:#111827;font-weight:500;">' . wc_price($min_price) . ($is_same ? '' : ' – ' . wc_price($max_price)) . '</span>';
            }

            if ($min_price > 200000) {
                $free_shipping = true;
            }

        } else {
            $regular_price = (float) $product->get_regular_price();
            $current_price = (float) $product->get_price();

            if ($current_price <= 0) continue;

            if ($regular_price > $current_price && $regular_price > 0) {
                $discount = round((($regular_price - $current_price) / $regular_price) * 100);
                $badge_html = '<div style="position: absolute; top: 0px; background-color: #dc2626; color: white; font-size: 12px; padding: 0px 12px; border-radius: 0 0px 4px 0; font-weight: bold;">
                    - ' . $discount . '%</div>';
                $price_html = '<del style="color:#6b7280;font-size:12px;">' . wc_price($regular_price) . '</del> 
                               <ins style="text-decoration: none; color: #059669;">' . wc_price($current_price) . '</ins>';
            } else {
                $price_html = '<span style="color:#111827;font-weight:500;">' . wc_price($current_price) . '</span>';
            }

            if ($current_price > 200000) {
                $free_shipping = true;
            }
        }

        $badges_below = '';
        if ($free_shipping) {
//             $badges_below .= '<span style="background-color:#ffedd5;color:#c2410c;font-size:12px;padding:0px 12px;border-radius:6px;display:inline-block;margin-right:4px;margin-bottom:8px;">Free Ongkir</span>';
			
			$badges_below .= '<img src="https://jete.id/wp-content/uploads/2025/07/freeongkir.png" alt="Poin Belanja" style="width:56px; margin-right: 16px;">';
        }
//         $badges_below .= '<span style="background-color:#d5ffdd;color:#4cc20c;font-size:12px;padding:0px 12px;border-radius:6px;display:inline-block;margin-bottom:8px;">Poin Belanja</span>';
		
		$badges_below .= '<img src="https://jete.id/wp-content/uploads/2025/07/poin-belanjaa.png" alt="Poin Belanja" style="width:46px">';

        $rating = wc_get_rating_html($product->get_average_rating());

        echo '<a href="' . esc_url($permalink) . '" class="latest-product-card">
            <div style="position: relative; text-align:center !important;">
                <img src="' . esc_url($image_url) . '" alt="' . esc_attr($title) . '">
                ' . $badge_html . '
            </div>
            <div class="product-content">
			<div class="badge-selling">' . $badges_below . '</div>
                <h3>' . esc_html($title) . '</h3>
                ' . ($rating ? $rating : '') . '
                <p>' . $price_html . '</p>
                
            </div>
        </a>';
    }

    echo '</div>';
    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('latest_products_card', 'custom_latest_products_card_shortcode');
function custom_countdown_timer_shortcode() {
    ob_start();
    ?>
<style>
#countdown-timer-wrapper {
    font-family: "Plus Jakarta Sans", sans-serif !important;
    color: white;
    text-align: center;
    background-color: #0b0e15;
    padding: 20px;
    border-radius: 12px;
    max-width: 600px;
    margin: 0 auto;
}

.countdown-display {
    font-size: 48px;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    font-family: "Plus Jakarta Sans", sans-serif;
    flex-wrap: wrap;
}

.countdown-item {
    text-align: center;
    min-width: 60px;
}

.countdown-item span {
    font-weight: 600;
}

.countdown-label {
    font-size: 16px;
    color: white;
    margin-top: 5px;
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: bold;
}

.countdown-meta {
    margin-top: 10px;
    font-size: 14px;
    color: #ccc;
    display: none;
}

/* ✅ Responsive untuk mobile */
@media (max-width: 768px) {
    .countdown-display {
        font-size: 32px;
        gap: 4px;
    }

    .countdown-item {
        min-width: 50px;
    }

    .countdown-label {
        font-size: 12px;
    }
}

.promo-akhir {
    font-family: "Plus Jakarta Sans" !important;
    font-size: 20px !important;
    color: white !important;
    font-weight: bold;
    padding: 0 !important;
    margin-bottom: 6px;
}
</style>

<div id="countdown-timer-wrapper">
    <p class="promo-akhir">
        Promo akan berakhir pada
    </p>
    <div class="countdown-display">
        <div class="countdown-item">
            <span id="days">00</span>
            <div class="countdown-label">DAYS</div>
        </div>
        <div>:</div>
        <div class="countdown-item">
            <span id="hours">00</span>
            <div class="countdown-label">HOURS</div>
        </div>
        <div>:</div>
        <div class="countdown-item">
            <span id="minutes">00</span>
            <div class="countdown-label">MINUTES</div>
        </div>
        <div>:</div>
        <div class="countdown-item">
            <span id="seconds">00</span>
            <div class="countdown-label">SECONDS</div>
        </div>
    </div>
    <div class="countdown-meta">
        🗓️ <span id="target-date"></span> &nbsp; 🕘 09:00 AM
    </div>
</div>

<script>
(function() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const dateEl = document.getElementById("target-date");

    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 9, 0, 0);
    dateEl.textContent = target.toDateString();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = target.getTime() - now;

        if (distance < 0) {
            document.getElementById("countdown-timer-wrapper").innerHTML = "<strong>Countdown Berakhir</strong>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
</script>
<?php
    return ob_get_clean();
}
add_shortcode('countdown_timer_5', 'custom_countdown_timer_shortcode');



// add_filter( 'woocommerce_loop_add_to_cart_link', 'custom_redirect_atc_link', 10, 2 );

// function custom_redirect_atc_link( $link, $product ) {
//     $product_id = $product->get_id();

//     $custom_url = 'https://store.jete.id/?add-to-cart=' . $product_id;

//     return sprintf(
//         '<a href="%s" class="button product_type_%s">%s</a>',
//         esc_url( $custom_url ),
//         esc_attr( $product->get_type() ),
//         esc_html( $product->add_to_cart_text() )
//     );
// }

// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );

// add_action( 'woocommerce_single_product_summary', 'custom_redirect_atc_single_product', 30 );

// function custom_redirect_atc_single_product() {
//     global $product;

//     if ( $product && $product->is_purchasable() && $product->is_in_stock() ) {
//         $product_id = $product->get_id();
//         $custom_url = 'https://store.jete.id/?add-to-cart=' . $product_id;

//         echo '<a href="' . esc_url( $custom_url ) . '" class="button alt">Tambah ke Keranjang</a>';
//     }
// }

add_action('template_redirect', function () {
    // Redirect jika sedang add-to-cart
    if ( isset($_GET['add-to-cart']) ) {
        $product_id = intval($_GET['add-to-cart']);
        if ( $product_id > 0 ) {
            wp_redirect('https://store.jete.id/?add-to-cart=' . $product_id);
            exit;
        }
    }

    // Redirect jika berada di halaman cart atau checkout
    if ( is_cart() || is_checkout() ) {
        wp_redirect('https://store.jete.id');
        exit;
    }
});


add_filter('wc_add_to_cart_message_html', '__return_false');


add_filter( 'woocommerce_add_to_cart_validation', 'block_add_to_cart', 10, 2 );

function block_add_to_cart( $passed, $product_id ) {
    return false;
}




function shortcode_bulan_sekarang() {
    $bulan = [
        1 => 'Januari',
        2 => 'Februari',
        3 => 'Maret',
        4 => 'April',
        5 => 'Mei',
        6 => 'Juni',
        7 => 'Juli',
        8 => 'Agustus',
        9 => 'September',
        10 => 'Oktober',
        11 => 'November',
        12 => 'Desember'
    ];

    $nomor_bulan = date('n');

    return $bulan[$nomor_bulan];
}

add_shortcode('bulan_sekarang', 'shortcode_bulan_sekarang');

function ubah_item_menu_bulan_dinamis($items) {
    $bulan = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret',
        4 => 'April', 5 => 'Mei', 6 => 'Juni',
        7 => 'Juli', 8 => 'Agustus', 9 => 'September',
        10 => 'Oktober', 11 => 'November', 12 => 'Desember'
    ];

    $now = date('n');
    $tahun = date('Y');
    $bulan_ini = $bulan[$now];

    foreach ($items as $item) {
        if (strpos($item->title, 'BULAN INI') !== false) {
            $item->title = str_replace('BULAN INI', $bulan_ini, $item->title);
        }
    }

    return $items;
}
add_filter('wp_nav_menu_objects', 'ubah_item_menu_bulan_dinamis');

function ganti_meta_title_bulan_dinamis($title_parts) {
    if (is_page()) {
        $bulan = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret',
            4 => 'April', 5 => 'Mei', 6 => 'Juni',
            7 => 'Juli', 8 => 'Agustus', 9 => 'September',
            10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $sekarang = $bulan[date('n')];

        if (strpos($title_parts['title'], 'BULAN INI') !== false) {
            $title_parts['title'] = str_replace('BULAN INI', $sekarang, $title_parts['title']);
        }
    }
    return $title_parts;
}
add_filter('document_title_parts', 'ganti_meta_title_bulan_dinamis');

function inject_truconversion_script() {
    ?>
<!-- TruConversion for dorangadget.com -->
<script type="text/javascript">
console.log('True Conversion Triggered');
var _tip = _tip || [];
(function(d, s, id) {
    var js, tjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.async = true;
    js.src = d.location.protocol + '//app.truconversion.com/ti-js/19933/8092c.js';
    tjs.parentNode.insertBefore(js, tjs);
}(document, 'script', 'ti-js'));
</script>
<?php
}
add_action('wp_head', 'inject_truconversion_script');



add_filter( 'woocommerce_dropdown_variation_attribute_options_html', function( $html, $args ) {
    if ( empty( $args['options'] ) || ! taxonomy_exists( $args['attribute'] ) ) {
        return $html;
    }

    $product = $args['product'];
    $new_options = '';

    foreach ( $args['options'] as $option ) {
        $term = get_term_by( 'slug', $option, $args['attribute'] );
        if ( ! $term ) continue;

 
        $stock_status = 'Ready Stock';
        foreach ( $product->get_children() as $child_id ) {
            $variation = wc_get_product( $child_id );
            if ( $variation && $variation->is_type( 'variation' ) ) {
                $attrs = $variation->get_attributes();
                if ( isset( $attrs[$args['attribute']] ) && $attrs[$args['attribute']] == $option ) {
                    if ( ! $variation->is_in_stock() ) {
                        $stock_status = 'Out of Stock';
                    }
                    break;
                }
            }
        }

        $new_options .= sprintf(
            '<option value="%s" data-stock="%s">%s</option>',
            esc_attr( $option ),
            esc_attr( $stock_status ),
            esc_html( $term->name )
        );
    }

   
    $custom_dropdown  = '<select class="custom-dropdown" name="' . esc_attr( $args['attribute'] ) . '" data-attribute_name="attribute_' . esc_attr( $args['attribute'] ) . '">';
    $custom_dropdown .= '<option value="">' . esc_html__( 'Pilih opsi', 'woocommerce' ) . '</option>';
    $custom_dropdown .= $new_options;
    $custom_dropdown .= '</select>';

    return $custom_dropdown;
}, 10, 2 );


add_action( 'wp_footer', function() {
    if ( ! is_product() ) return; // Hanya di halaman produk
    ?>
<style>
.option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.select2-dropdown.select2-dropdown--below {
    margin-top: 2% !important;
}

.select2-selection__rendered {
    padding: 0 !important;
    margin: 0 !important;
}

.select2-results__options li {
    font-family: "Plus Jakarta Sans" !important;
    font-size: 14px;
    padding: 12px 8px !important;
}

.select2-selection__rendered {
    font-family: "Plus Jakarta Sans" !important;
    font-size: 14px;
}

.select2-dropdown.select2-dropdown--below {
    z-index: 3 !important;
}

.option-label {
    /*             font-weight: bold; */
    font-family: "Plus Jakarta Sans" !important;
}

.badge {
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.badge::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.badge-green {
    background-color: #b2f5b4;
    color: #008000;
    font-family: "Plus Jakarta Sans" !important;
}

.badge-green::before {
    background-color: #008000;
}

.badge-red {
    background-color: #f5b4b4;
    color: #a00000;
    font-family: "Plus Jakarta Sans" !important;
}

.badge-red::before {
    background-color: #a00000;
}
</style>
<script>
jQuery(function($) {
    function formatOption(option) {
        if (!option.id) return option.text;
        var stockStatus = $(option.element).data('stock');
        var stockClass = stockStatus === 'Ready Stock' ? 'badge-green' : 'badge-red';
        return '<div class="option-item">' +
            '<span class="option-label">' + option.text + '</span>' +
            '<span class="badge ' + stockClass + '">' + stockStatus + '</span>' +
            '</div>';
    }

    function formatSelected(option) {
        if (!option.id) return option.text;
        var stockStatus = $(option.element).data('stock');
        var stockClass = stockStatus === 'Ready Stock' ? 'badge-green' : 'badge-red';
        // Bisa badge kecil atau cuma teks
        return option.text;
    }

    $('select.custom-dropdown').select2({
        templateResult: formatOption,
        templateSelection: formatSelected,
        width: '100%',
        minimumResultsForSearch: Infinity,
        escapeMarkup: function(m) {
            return m;
        }
    });
});
</script>
<?php
});


add_action('template_redirect', function() {
    if (!is_singular('product-licenses')) {
        return;
    }

    global $post;

    $has_term       = has_term('e-postel', 'license-category', $post);
    $temporary_postel = get_field('temporary_postel', $post->ID);
    $is_child       = ($post->post_parent > 0);

//     if (current_user_can('manage_options')) { 
//         echo "<pre>";
//         echo "POST ID: {$post->ID}\n";
//         echo "Parent ID: {$post->post_parent}\n";
//         echo "Has Term e-postel: " . ($has_term ? 'YES' : 'NO') . "\n";
//         echo "Temporary Postel: " . var_export($temporary_postel, true) . "\n";
//         echo "Is Child: " . ($is_child ? 'YES' : 'NO') . "\n";
//         echo "</pre>";
//     }

    if ($has_term && $is_child && !empty($temporary_postel)) {
        wp_redirect(home_url('/temporary-postel'), 301);
        exit;
    }
});


function custom_slider_with_text_shortcode() {
    ob_start(); 
    ?>
<!-- Load Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<div class="custom-slider-wrapper">
    <!-- Slider -->
    <div class="swiper custom-swiper">
        <div class="swiper-wrapper">

            <!-- Slide 1 -->
            <div class="swiper-slide" data-title="Monitor Every Moment with Smart Features"
                data-desc="Awasi rumah dan perangkat Anda secara real-time dengan fitur pintar yang memberikan keamanan, kenyamanan, dan ketenangan setiap saat."
                data-btn="Read more">
                <img src="https://jete.id/wp-content/uploads/2025/06/JETE-SMART-for-Android5.jpg" alt="App Preview 1">
            </div>

            <!-- Slide 2 -->
            <div class="swiper-slide" data-title="Stay Connected with Real-Time Monitoring"
                data-desc="Tetap terhubung di mana pun Anda berada dengan fitur pemantauan real-time. Pantau perangkat Smarthome secara langsung melalui aplikasi JETE Smart, sehingga Anda selalu mengetahui kondisi terkini dan dapat mengontrolnya dengan mudah hanya lewat smartphone Anda."
                data-btn="Read more">
                <img src="https://jete.id/wp-content/uploads/2025/06/JETE-SMART-for-Android-4.jpg" alt="App Preview 1">
            </div>

            <!-- Slide 3 -->
            <div class="swiper-slide" data-title="Smart Automation Made Easy"
                data-desc="Nikmati kemudahan mengatur otomatisasi perangkat Smarthome hanya dengan beberapa sentuhan. Dengan JETE Smart, Anda bisa membuat jadwal, mengatur skenario, dan menghubungkan berbagai perangkat agar bekerja selaras sesuai kebutuhan harian Anda."
                data-btn="Start Now">
                <img src="https://jete.id/wp-content/uploads/2025/06/JETE-SMART-for-Android-3.jpg" alt="App Preview 2">
            </div>

            <!-- Slide 4 -->
            <div class="swiper-slide" data-title="Simply Your Life With Tap-to-Run Automation"
                data-desc="Nikmati kemudahan mengontrol berbagai perangkat hanya dengan sekali sentuh. Automasi Tap-to-Run membantu Anda menghemat waktu, meningkatkan kenyamanan, dan membuat hidup lebih praktis."
                data-btn="See Progress">
                <img src="https://jete.id/wp-content/uploads/2025/06/JETE-SMART-for-Android-2.jpg" alt="App Preview 3">
            </div>
        </div>

        <!-- Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
    </div>

    <!-- Text Section -->
    <div class="slider-content">
        <span class="feature-label">MAIN FEATURES</span>
        <h2 id="slide-title">Take control of your life more easily</h2>
        <p id="slide-desc">We provide personalized approaches for different types of addictions—to ensure the right
            method is used for overcoming them.</p>

    </div>
</div>

<!-- Load Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".custom-swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange: function() {
                let activeSlide = this.slides[this.activeIndex];
                let title = activeSlide.getAttribute("data-title");
                let desc = activeSlide.getAttribute("data-desc");


                document.getElementById("slide-title").innerText = title;
                document.getElementById("slide-desc").innerText = desc;

            }
        }
    });
});
</script>

<style>
.swiper-slide {
    text-align: center !important;
}

.custom-slider-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
}

.slider-content {
    flex: 1;
    max-width: 45%;
}

.slider-content .feature-label {
    display: inline-block;
    padding: 6px 12px;
    background: #e6f0ff;
    color: #007bff;
    font-size: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
}

.slider-content h2 {
    font-family: "DM Sans" !important;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px;
}

.slider-content p {
    font-family: "DM Sans" !important;
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
}

.slider-content .read-more-btn {
    display: inline-block;
    padding: 10px 16px;
    border: 1px solid #007bff;
    border-radius: 8px;
    text-decoration: none;
    color: #007bff;
    transition: all 0.3s;
}

.slider-content .read-more-btn:hover {
    background: #007bff;
    color: #fff;
}

.custom-swiper {
    flex: 1;
    max-width: 45%;
}

.custom-swiper img {
    width: 55%;
    border-radius: 16px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 14px !important;
    background-color: orange !important;
    color: white !important;
    padding: 8px 12px;
    border-radius: 999px;
}

.swiper-pagination-bullet-active {
    background: orange !important;
}

@media (max-width: 1024px) {
    .custom-slider-wrapper {
        flex-direction: column;
        text-align: center;
    }

    .slider-content {
        max-width: 100%;
        order: 2;
        /* teks pindah ke bawah */
    }

    .custom-swiper {
        max-width: 100%;
        order: 1;
        /* gambar di atas */
    }

    .slider-content h2 {
        font-size: 24px;
    }

    .slider-content p {
        font-size: 14px;
    }
}

@media (max-width: 600px) {
    .slider-content h2 {
        font-size: 20px;
    }

    .slider-content p {
        font-size: 13px;
    }

    .slider-content .read-more-btn {
        padding: 8px 12px;
        font-size: 14px;
    }
}
</style>
<?php
    return ob_get_clean();
}
add_shortcode('custom_slider', 'custom_slider_with_text_shortcode');


// Register Custom Post Type FAQ (hanya backend)
function create_faq_post_type() {
    $labels = array(
        'name' => 'FAQs',
        'singular_name' => 'FAQ',
        'menu_name' => 'FAQs',
        'all_items' => 'All FAQs',
        'add_new_item' => 'Add New FAQ',
        'edit_item' => 'Edit FAQ',
        'new_item' => 'New FAQ',
        'view_item' => 'View FAQ',
        'search_items' => 'Search FAQ',
    );

    $args = array(
        'labels' => $labels,
        'public' => false,          // 🚫 tidak tampil di front
        'publicly_queryable' => false,
        'show_ui' => true,          // ✅ tetap ada di admin
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-editor-help',
        'exclude_from_search' => true,
        'rewrite' => false,         // 🚫 tidak bikin slug /faq
        'has_archive' => false,     // 🚫 tidak ada archive
        'supports' => array('title', 'editor'),
    );

    register_post_type('faq', $args);

    // Taxonomy buat kategori
    register_taxonomy(
        'faq_category',
        'faq',
        array(
            'label' => 'FAQ Categories',
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'public' => false,       // 🚫 tidak queryable
            'rewrite' => false,      // 🚫 tidak bikin slug
        )
    );
}
add_action('init', 'create_faq_post_type');


// Shortcode [faq_full]
function faq_full_shortcode() {
    // Ambil semua kategori FAQ
    $categories = get_terms(array(
        'taxonomy' => 'faq_category',
        'hide_empty' => false,
    ));

    if (empty($categories)) {
        return '<p>No FAQ categories found.</p>';
    }

    $output = '<div class="faq-wrapper">';

    // Bagian tombol kategori
    $output .= '<div class="faq-categories">';
    $first = true;
    foreach ($categories as $cat) {
        $active_class = $first ? 'active' : '';
        $output .= '<button class="faq-category-btn '.$active_class.'" data-cat="'.$cat->slug.'">'.$cat->name.'</button>';
        $first = false;
    }
    $output .= '</div>';

    // Bagian konten FAQ per kategori
    foreach ($categories as $cat) {
        $faqs = new WP_Query(array(
            'post_type' => 'faq',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'tax_query' => array(
                array(
                    'taxonomy' => 'faq_category',
                    'field'    => 'slug',
                    'terms'    => $cat->slug,
                )
            )
        ));

        $output .= '<div class="faq-content" id="faq-'.$cat->slug.'" style="display:none;">';

        if ($faqs->have_posts()) {
            while ($faqs->have_posts()) {
                $faqs->the_post();
                $output .= '
                <div class="faq-item">
                    <button class="faq-question">' . get_the_title() . '<span class="toggle-icon">+</span></button>
                    <div class="faq-answer">' . wpautop(get_the_content()) . '</div>
                </div>';
            }
        } else {
            $output .= '<p>No FAQs in this category.</p>';
        }
        wp_reset_postdata();

        $output .= '</div>';
    }

    $output .= '</div>'; // end wrapper

    // Script kategori + accordion
    $output .= "
    <script>
    document.addEventListener('DOMContentLoaded', function(){
        // Show first category by default
        document.querySelector('.faq-content').style.display = 'block';

        // Handle category switch
        document.querySelectorAll('.faq-category-btn').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                document.querySelectorAll('.faq-category-btn').forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                
                document.querySelectorAll('.faq-content').forEach(c=>c.style.display='none');
                document.querySelector('#faq-'+btn.dataset.cat).style.display='block';
            });
        });

        // Accordion
        document.querySelectorAll('.faq-question').forEach(q=>{
            q.addEventListener('click', ()=>{
                let parent = q.parentElement;
                parent.classList.toggle('active');
                let answer = parent.querySelector('.faq-answer');
                if(answer.style.maxHeight){
                    answer.style.maxHeight = null;
                    q.querySelector('.toggle-icon').innerHTML = '+';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    q.querySelector('.toggle-icon').innerHTML = '-';
                }
            });
        });
    });
    </script>
    ";

    // CSS
    $output .= "
    <style>
    .faq-wrapper{max-width:80%;margin:auto;box-sizing: border-box !important;}
    .faq-categories{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px;}
    .faq-category-btn{
        border:1px solid #ccc;
        background:#fff;
        padding:8px 16px;
        border-radius:20px;
        cursor:pointer;
        font-size:14px;
        transition:all .2s;
		font-family: 'DM Sans' !important;
    }
    .faq-category-btn.active{
        background:#000;
        color:#fff;
        border-color:#000;
    }
    .faq-item{padding:10px 0;}
    .faq-question{
        background:none;border:none;width:100%;
        text-align:left;font-size:16px;font-weight:500;
        cursor:pointer;display:flex;justify-content:space-between;align-items:center;
		font-family: 'DM Sans' !important;
		 padding: 12px 18px;
		border: 1px solid #cdcdcd;
		border-radius: 6px;
    }
    .faq-answer{max-height:0;overflow:hidden;transition:max-height .3s ease;font-size:14px;color:#555;padding-left:5px;font-family: 'DM Sans' !important;}
    .faq-item.active .faq-answer{    padding: 12px 18px; font-family: 'DM Sans' !important;}
	.faq-item.active .faq-answer p{    font-family: 'DM Sans' !important; padding:0 !important;}
	.faq-answer p{    font-family: 'DM Sans' !important; padding:0 !important;}
    .toggle-icon{font-size:20px;}
	
	/* --- RESPONSIVE --- */
@media(max-width:1024px){
  .faq-wrapper{max-width:90%;padding:0 10px;}
}

@media(max-width:768px){
  .faq-categories{gap:8px;}
  .faq-category-btn{
      flex:1 1 calc(50% - 8px); /* dua kolom di tablet */
      text-align:center;
      font-size:13px;
      padding:6px 10px;
  }
  .faq-question{font-size:15px;padding:10px 14px;}
  .faq-answer{font-size:13px;}
  .faq-content {
  box-sizing: border-box !important;
  }
}

@media(max-width:480px){
  .faq-categories{
      flex-direction:column; /* jadi satu kolom */
  }
  .faq-category-btn{
      flex:1 1 100%;
      font-size:14px;
      border-radius:12px;
  }
  .faq-question{font-size:14px;padding:10px 12px;}
  .faq-answer{font-size:13px;}
}
    </style>
    ";

    return $output;
}
add_shortcode('faq_section','faq_full_shortcode');

function custom_slider_jtconnect_smartwatch() {
    ob_start(); 
    ?>
<!-- Load Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<div class="custom-slider-wrapper">
    <!-- Slider -->
    <div class="swiper custom-swiper">
        <div class="swiper-wrapper">

            <!-- Slide 1 -->
            <div class="swiper-slide" data-title="Tampilan Home JETE Connect"
                data-desc="Pada halaman Home JETE Connect, kamu bisa melihat ringkasan lengkap mulai dari langkah harian, detak jantung, kualitas tidur, hingga aktivitas terbaru secara real-time."
                data-btn="Read more">
                <img src="https://jete.id/wp-content/uploads/2023/08/Home-Jeteconnect-lightmode.jpg"
                    alt="App Preview 1">
            </div>

            <!-- Slide 2 -->
            <div class="swiper-slide" data-title="Tampilan Maps Ketika Berlari"
                data-desc="TFitur Maps menampilkan rute lari secara real-time, lengkap dengan jarak tempuh dan durasi, sehingga kamu bisa melacak progres aktivitas olahraga dengan lebih akurat."
                data-btn="Read more">
                <img src="https://jete.id/wp-content/uploads/2023/08/Maps-Lari-Jeteconnect-lightmode.jpg"
                    alt="App Preview 1">
            </div>

            <!-- Slide 3 -->
            <div class="swiper-slide" data-title="Monthly Running Leaderboard"
                data-desc="Naikkan semangat olahragamu! Cek posisi kamu di Monthly Running Leaderboard dan lihat siapa yang berhasil mencatatkan lari terbaik bulan ini."
                data-btn="Start Now">
                <img src="https://jete.id/wp-content/uploads/2023/08/LeaderBoard-Jeteconnect-lightmode.jpg"
                    alt="App Preview 2">
            </div>

            <!-- Slide 4 -->
            <div class="swiper-slide" data-title="Banyak Pilihan Watch Face"
                data-desc="Temukan banyak pilihan watch face yang bisa kamu ganti kapan saja. Sesuaikan Smartwatch dengan mood, aktivitas, atau gaya personalmu setiap hari."
                data-btn="See Progress">
                <img src="https://jete.id/wp-content/uploads/2023/08/Watch-face-Jeteconnect-lightmode.jpg"
                    alt="App Preview 3">
            </div>

            <!-- Slide 5 -->
            <div class="swiper-slide" data-title="My Stellar Data"
                data-desc="Kenali dirimu lebih baik lewat My Stellar Data! Semua catatan aktivitas dan kesehatan tersaji rapi untuk mendukung gaya hidup sehatmu."
                data-btn="See Progress">
                <img src="https://jete.id/wp-content/uploads/2023/08/Stellar-Data-Jeteconnect-lightmode.jpg"
                    alt="App Preview 3">
            </div>

            <!-- Slide 6 -->
            <div class="swiper-slide" data-title="Custom Dial"
                data-desc="Fitur Custom Dial memungkinkan kamu mengganti dan menyesuaikan tampilan jam dengan foto atau desain favorit, sehingga Smartwatch terasa lebih personal."
                data-btn="See Progress">
                <img src="https://jete.id/wp-content/uploads/2023/08/Custom-dial-Jeteconnect-lightmode.jpg"
                    alt="App Preview 3">
            </div>
        </div>

        <!-- Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
    </div>

    <!-- Text Section -->
    <div class="slider-content">
        <span class="feature-label">MAIN FEATURES</span>
        <h2 id="slide-title">Take control of your life more easily</h2>
        <p id="slide-desc">We provide personalized approaches for different types of addictions—to ensure the right
            method is used for overcoming them.</p>

    </div>
</div>

<!-- Load Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".custom-swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            slideChange: function() {
                let activeSlide = this.slides[this.activeIndex];
                let title = activeSlide.getAttribute("data-title");
                let desc = activeSlide.getAttribute("data-desc");


                document.getElementById("slide-title").innerText = title;
                document.getElementById("slide-desc").innerText = desc;

            }
        }
    });
});
</script>

<style>
.swiper-slide {
    text-align: center !important;
}

.custom-slider-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
}

.slider-content {
    flex: 1;
    max-width: 45%;
}

.slider-content .feature-label {
    display: inline-block;
    padding: 6px 12px;
    background: #e6f0ff;
    color: #007bff;
    font-size: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
}

.slider-content h2 {
    font-family: "DM Sans" !important;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 16px;
}

.slider-content p {
    font-family: "DM Sans" !important;
    font-size: 16px;
    margin-bottom: 20px;
    color: #666;
}

.slider-content .read-more-btn {
    display: inline-block;
    padding: 10px 16px;
    border: 1px solid #007bff;
    border-radius: 8px;
    text-decoration: none;
    color: #007bff;
    transition: all 0.3s;
}

.slider-content .read-more-btn:hover {
    background: #007bff;
    color: #fff;
}

.custom-swiper {
    flex: 1;
    max-width: 45%;
}

.custom-swiper img {
    width: 55%;
    border-radius: 16px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 14px !important;
    background-color: orange !important;
    color: white !important;
    padding: 8px 12px;
    border-radius: 999px;
}

.swiper-pagination-bullet-active {
    background: orange !important;
}

@media (max-width: 1024px) {
    .custom-slider-wrapper {
        flex-direction: column;
        text-align: center;
    }

    .slider-content {
        max-width: 100%;
        order: 2;
        /* teks pindah ke bawah */
    }

    .custom-swiper {
        max-width: 100%;
        order: 1;
        /* gambar di atas */
    }

    .slider-content h2 {
        font-size: 24px;
    }

    .slider-content p {
        font-size: 14px;
    }
}

@media (max-width: 600px) {
    .slider-content h2 {
        font-size: 20px;
    }

    .slider-content p {
        font-size: 13px;
    }

    .slider-content .read-more-btn {
        padding: 8px 12px;
        font-size: 14px;
    }
}
</style>
<?php
    return ob_get_clean();
}
add_shortcode('custom_slider_smartwatch_connect', 'custom_slider_jtconnect_smartwatch');

// function bulanTahunSekarang
function bulantahunsekarang() {
	$bulan = [
		1=> "Januari",
        2=> "Februari",
        3=> "Maret",
        4=> "April",
        5=> "Mei",
        6=> "Juni",
        7=> "Juli",
        8=> "Agustus",
        9=> "September",
        10=> "Oktober",
        11=> "November",
        12=> "Desember"
	];
	
	//panggil bulan & tahun sekarang
	$bulansekarang = $bulan[date('n')];
	$tahunsekarang = date('Y');
	
	return $bulansekarang. '' .$tahunsekarang;
}
add_shortcode('bulan_tahun', 'bulantahunsekarang');

add_action('admin_menu', function() {
    add_submenu_page(
        'edit.php?post_type=user-manual', // ganti "nama_cpt" sesuai slug CPT kamu
        'Export Data',
        'Export Data',
        'manage_options',
        'export-nama_cpt',
        'export_nama_cpt_callback'
    );
});

// Callback untuk halaman Export
function export_nama_cpt_callback() {
    echo '<div class="wrap">';
    echo '<h1>Export Data CPT</h1>';
    echo '<p>Klik tombol di bawah untuk mendownload data dalam format CSV.</p>';
    echo '<a href="'.admin_url('admin-post.php?action=export_user_manual').'" class="button button-primary">Export ke CSV</a>';
    echo '</div>';
}

// Handle proses export
add_action('admin_post_export_user_manual', 'handle_export_user_manual');

function handle_export_user_manual() {
    if (!current_user_can('manage_options')) {
        wp_die('Tidak ada akses');
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=export-user-manual.csv');
    $output = fopen('php://output', 'w');

    // Header kolom CSV
    fputcsv($output, ['Judul', 'User Manual Categories', 'Tanggal']);

    // Ambil semua post dari CPT
    $args = [
        'post_type'      => 'user-manual', // ganti sesuai slug CPT kamu
        'posts_per_page' => -1
    ];
    $query = new WP_Query($args);

    if($query->have_posts()) {
        while($query->have_posts()) {
            $query->the_post();

            // Ambil kategori taxonomy (misal taxonomy: user_manual_category)
            $terms = get_the_terms(get_the_ID(), 'user-manual-category');
            $categories = [];
            if ($terms && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    $categories[] = $term->name;
                }
            }
            $categories_str = implode(', ', $categories);

            // Ambil tanggal publish
            $tanggal = get_the_date('Y-m-d');

            // Masukkan ke CSV
            fputcsv($output, [get_the_title(), $categories_str, $tanggal]);
        }
        wp_reset_postdata();
    }

    exit;
}


// function custom_whatsapp_button() {
//     ob_start();

//     $jumlah_nomor = get_field('jumlah_nomor');

//     if ($jumlah_nomor === '1 Nomor') {
//         $wa = get_field('whatsapp_1_nomor');
//         if (!empty($wa['nomor_telepon'])) {
//             $nomor   = preg_replace('/[^0-9]/', '', $wa['nomor_telepon']);
//             $preview = urlencode($wa['preview_text_wa'] ?? '');

//             echo '<div class="custom-wa-btn">';
//             echo '<a href="https://wa.me/' . $nomor . '?text=' . $preview . '" target="_blank" rel="noopener">';
//             echo 'Chat via WhatsApp';
//             echo '</a>';
//             echo '</div>';
//         }

//     } elseif ($jumlah_nomor === '2 Nomor') {
//         $wa2 = get_field('whatsapp_2_nomor');
//         if (!empty($wa2)) {
//             echo '<div class="custom-wa-btns">';
//             if (!empty($wa2['nomor_1'])) {
//                 $nomor1 = preg_replace('/[^0-9]/', '', $wa2['nomor_1']);
//                 $label1 = $wa2['label_nomor_1'] ?? 'WhatsApp 1';
//                 $desc1  = $wa2['description_nomor_1'] ?? '';
//                 echo '<a class="wa-btn" href="https://wa.me/' . $nomor1 . '" target="_blank" rel="noopener">';
//                 echo '<strong>' . esc_html($label1) . '</strong><br><small>' . esc_html($desc1) . '</small>';
//                 echo '</a>';
//             }
//             if (!empty($wa2['nomor_2'])) {
//                 $nomor2 = preg_replace('/[^0-9]/', '', $wa2['nomor_2']);
//                 $label2 = $wa2['label_nomor_2'] ?? 'WhatsApp 2';
//                 $desc2  = $wa2['description_nomor_2'] ?? '';
//                 echo '<a class="wa-btn" href="https://wa.me/' . $nomor2 . '" target="_blank" rel="noopener">';
//                 echo '<strong>' . esc_html($label2) . '</strong><br><small>' . esc_html($desc2) . '</small>';
//                 echo '</a>';
//             }
//             echo '</div>';
//         }
//     }

//     return ob_get_clean();
// }
// add_shortcode('whatsapp_button', 'custom_whatsapp_button');
add_action('wp_footer', function () {
//     if (!is_page('symbol')) return;

    $jumlah = get_field('jumlah_nomer');
    $wa1    = get_field('whatsapp_1_nomor');
    $wa2    = get_field('whatsapp_2_nomor');
	
	if ($jumlah === 'Hidden') {
		return;
	}

    if ($jumlah === '1 Nomor' && !empty($wa1['nomor_telepon'])) {
        // 1 Nomor → langsung tombol WA
        $url = "https://wa.me/" . esc_attr($wa1['nomor_telepon']) . "?text=" . urlencode($wa1['preview_text_wa']);
        echo '<div class="wa-floating">
                <a href="' . $url . '" target="_blank" class="wa-btn">
				<span class="wa-icon">
				  <img src="https://jete.id/wp-content/uploads/2025/09/questmark.png" alt="icon"/>
				  </span>
				  <div>
					  <p class="judulBtn">Butuh Bantuan?</p>
					  <p class="descBtn">Hubungi CS JETE</p>
				  </div>
                </a>
              </div>';
    }

    if ($jumlah === '2 Nomor') {
        // 2 Nomor → tombol + menu pilihan
        echo '<div class="wa-floating">
                <div id="wa-toggle" class="wa-btn">
                  <span class="wa-icon">
				  <img src="https://jete.id/wp-content/uploads/2025/09/questmark.png" alt="icon"/>
				  </span>
				  <div>
					  <p class="judulBtn">Butuh Bantuan?</p>
					  <p class="descBtn">Hubungi CS JETE</p>
				  </div>
                </div>
                <div id="wa-menu" class="wa-menu">
				<div class="judulClose">
				<h2>Hubungi CS Sesuai Kebutuhan Anda</h2>
				<span class="closeBtn">
				<img src="https://jete.id/wp-content/uploads/2025/09/close.png" alt="icon"/>
				</span>
				</div>
				
                    <a href="https://wa.me/' . esc_attr($wa2['nomor_1']) . '?text=' . urlencode($wa2['preview_text_wa_1']) . '" target="_blank" class="wa-subbtn">

						<div class="iconJudul">
                        	<span class="wa-icon-2">
								<img src="https://jete.id/wp-content/uploads/2025/09/shieldpro.png" alt="icon"/>
							</span>
                        	<p class="judulBtn">' . esc_html($wa2['label_nomor_1']) . '</p>
						</div>
                        <p class="descJudul">'. esc_html($wa2['description_nomor_1']) . '</p>
                    </a>
                    <a href="https://wa.me/' . esc_attr($wa2['nomor_2']) . '?text=' . urlencode($wa2['preview_text_wa_2']) . '" target="_blank" class="wa-subbtn">

                       <div class="iconJudul">
                        	<span class="wa-icon-2">
								<img src="https://jete.id/wp-content/uploads/2025/09/cart.png" alt="icon"/>
							</span>
                        	<p class="judulBtn">' . esc_html($wa2['label_nomor_2']) . '</p>
						</div>
                        <p class="descJudul">'. esc_html($wa2['description_nomor_2']) . '</p>
                    </a>
                </div>
              </div>';
    }

    // Styling + JS
    ?>
<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

.wa-floating {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: "Plus Jakarta Sans", sans-serif;
}

.wa-btn {
    display: flex;
    align-items: center;
    gap: 0.9vw;
    background: green;
    color: #fff;
    padding: 1vw;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 0.8vw;
    cursor: pointer;
    transition: transform 0.2s;
    width: 14.2vw;
    float: inline-end;
}

.wa-subbtn {
    background: #ff6e00;
    color: #fff;
    padding: 1vw;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    cursor: pointer;
    transition: transform 0.2s;
}

.wa-btn:hover,
.wa-subbtn:hover {
    transform: translateY(-2px);
    background: #e65c00;
}

.wa-icon {
    width: 3vw;
}

a:hover {
    text-decoration: none !important;
}

.wa-icon-2 {
    width: 5vw !important;
}

.wa-menu {
    display: none;
    flex-direction: column;
    margin-top: 0.8vw;
    background-color: white !important;
    padding: 2vw;
    border-radius: 20px;
    width: 25vw;
    box-shadow: 0px 4px 7px 0px #41414187;
}


.wa-menu h2 {
    font-size: 1.5vw !important;
    font-weight: bold !important;
    color: #ff6e00 !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
    margin-bottom: 10px;
}

.wa-icon-2 img {
    vertical-align: sub !important;
    padding: 0.1vw;
}

.wa-floating span,
.wa-floating p {
    font-family: "Plus Jakarta Sans", sans-serif !important;
    margin: 0 !important;
    padding: 0 !important;
    color: white !important;
}

.wa-floating .textBth {
    font-size: 1.2vw !important;
    font-family: "Plus Jakarta Sans", sans-serif !important;
}

.wa-floating .textHub {
    font-size: 0.9vw !important;
}

.descBtn {
    font-size: 0.9vw !important;
}

.iconJudul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6vw;
}

.judulBtn {
    font-family: "Plus Jakarta Sans", sans-serif !important;
    font-size: 1vw !important;
    font-weight: bold !important;
    margin: 0;
    padding: 0;
}

.descJudul {
    font-size: 0.8vw !important;
    margin: 0;
    padding: 0;
}

.closeBtn {
    width: 3vw !important;
    background-color: orange;
    border-radius: 999px;
    cursor: pointer;
}

.closeBtn img {
    padding: 0.6vw;
}

.judulClose {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}


@media only screen and (max-width: 800px) {
    .wa-menu {
        width: 350px;
        padding: 5vw;
    }

    .wa-subbtn {
        padding: 3vw;
    }

    .wa-btn {
        width: 56vw !important;
        gap: 3.9vw;
        padding: 4vw;
    }

    .wa-icon {
        width: 12vw;
    }


    .closeBtn {
        width: 13% !important;
        background-color: orange;
        border-radius: 999px;
        cursor: pointer;
    }

    .closeBtn img {
        padding: 8px;
    }

    .judulBtn {
        font-size: 3.8vw !important;
    }

    .descJudul {
        font-size: 3vw !important;
    }

    .wa-menu h2 {
        font-size: 4.5vw !important;
    }

    .wa-icon-2 {
        width: 15vw !important;
    }

    .descBtn {
        font-size: 2.9vw !important;
    }

    .iconJudul {
        gap: 4.5vw !important;
        margin-bottom: 1vw;
    }
}
</style>
<script>
document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById("wa-toggle");
    var closeB = document.querySelector(".closeBtn");
    var menu = document.getElementById("wa-menu");
    if (toggle && menu) {
        toggle.addEventListener("click", function() {
            menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
            toggle.style.display = 'none';
        });

        closeB.addEventListener("click", function() {
            menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
            toggle.style.display = 'flex';
        })
    }
});
</script>
<?php
});

function mfi_license_table_shortcode() {
    ob_start();

    global $wpdb;

    // 🔹 Ambil semua kategori unik dari ACF field 'mfi_kategori'
    $results = $wpdb->get_col("
        SELECT DISTINCT meta_value 
        FROM $wpdb->postmeta 
        WHERE meta_key = 'mfi_kategori' 
        AND meta_value != ''
        ORDER BY meta_value ASC
    ");

    // 🔹 Ambil filter kategori (filter ini masih server-side)
    $selected_category = isset($_GET['mfi_kategori']) ? sanitize_text_field($_GET['mfi_kategori']) : '';

    // 🔹 Pagination
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    $per_page = 1000; // ambil semua data (supaya search frontend jalan lancar)

    // 🔹 Query setup
    $meta_query = [];
    if ($selected_category) {
        $meta_query[] = [
            'key' => 'mfi_kategori',
            'value' => $selected_category,
            'compare' => '='
        ];
    }

    $args = [
        'post_type' => 'mfi',
        'posts_per_page' => $per_page,
        'orderby' => 'title',
        'order' => 'ASC',
        'meta_query' => $meta_query,
    ];

    $query = new WP_Query($args);
    $total_posts = $query->found_posts;

    // 🔹 Filter & Search
    echo '<div class="mfi-filter-form">';
    echo '<div class="mfi-filter-group">';
	  echo '<div class="mfi-filter-item search">';
    echo '<label for="mfi_search" class="mfi-filter-label">Cari:</label>';
    echo '<input type="text" id="mfi_search" placeholder="Ketik untuk mencari...">';
    echo '</div>';
    echo '<div class="mfi-filter-item kat">';
    echo '<label for="mfi_kategori" class="mfi-filter-label">Filter Kategori:</label>';
    echo '<select name="mfi_kategori" id="mfi_kategori" onchange="window.location.search = this.value ? \'?mfi_kategori=\' + encodeURIComponent(this.value) : \'\'">';
    echo '<option value="">Semua Kategori</option>';
    foreach ($results as $kategori) {
        $selected = ($selected_category === $kategori) ? 'selected' : '';
        echo '<option value="' . esc_attr($kategori) . '" ' . $selected . '>' . esc_html($kategori) . '</option>';
    }
    echo '</select>';
    echo '</div>';

  
    echo '</div>';
    echo '</div>';

     if ($query->have_posts()) :
        echo '<p class="mfi-count">Menampilkan ' . $total_posts . ' Produk MFi License</p>';

        echo '<div class="mfi-table-container">';
        echo '<table class="mfi-table" id="mfiTable">';
        echo '<thead>
                <tr>
                    <th>Gambar</th>
                    <th>Accessory Name</th>
                    <th>Model</th>
                    <th>Technology</th>
                    <th>Category</th>
                    <th>UPC / EAN</th>
                </tr>
              </thead>
              <tbody>';

        while ($query->have_posts()) : $query->the_post();
            $model = get_field('mfi_model');
            $technology = get_field('mfi_technology');
            $category = get_field('mfi_kategori');
            $upc = get_field('mfi_upc__ean');
            $thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');

            echo '<tr>';
            echo '<td data-label="Gambar">';
            if ($thumbnail) {
                echo '<img src="' . esc_url($thumbnail) . '" alt="' . esc_attr(get_the_title()) . '" class="mfi-thumb">';
            } else {
                echo '<span class="no-thumb">—</span>';
            }
            echo '</td>';
echo '<td data-label="Accessory Name"><a href="https://mfi.apple.com/account/accessory-search" target="_blank">' . esc_html(get_the_title()) . '</a></td>';

            echo '<td data-label="Model">' . esc_html($model) . '</td>';
            echo '<td data-label="Technology">' . esc_html($technology) . '</td>';
            echo '<td data-label="Category">' . esc_html($category) . '</td>';
            echo '<td data-label="UPC / EAN">' . esc_html($upc) . '</td>';
            echo '</tr>';
        endwhile;

        echo '</tbody></table>';
        echo '</div>';

        wp_reset_postdata();
    else :
        echo '<p>Tidak ada data MFi License ditemukan.</p>';
    endif;
    ?>

<style>
.mfi-filter-form {
    margin-bottom: 16px;
    font-family: 'DM Sans' !important;
}

.mfi-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

.mfi-filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.mfi-filter-label {
    font-size: 15px;
    color: #333;
}

#mfi_search,
.mfi-filter-form select {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-family: 'DM Sans' !important;
    font-size: 15px;
}

td a {
    font-family: 'DM Sans' !important;
    font-size: 15px !important;
}

.mfi-count {
    margin-bottom: 12px !important;
    font-size: 15px !important;
    color: #333 !important;
    font-family: 'DM Sans' !important;
}

.mfi-table-container {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ddd;
    /*             overflow-x: auto; */
}

.mfi-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;

}

table {
    border: 1px solid #8f8f8f !important;
}

.mfi-table thead {
    background-color: #f8f9fa;
}

.mfi-table th,
.mfi-table td {
    padding: 12px 16px;
    /*             border-bottom: 1px solid #eee; */
    font-family: 'DM Sans' !important;
}

.mfi-table tbody tr:hover {
    background-color: #f3f6ff;
}

.mfi-thumb {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ddd;
}

.highlight {
    background-color: #ffb74d;
    color: #000;
    font-weight: 600;
    border-radius: 3px;
    padding: 0 2px;
}

n.mfi-filter-group {
    display: flex !important;
    justify-content: space-between;
}

div.mfi-filter-item.search {
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

div.mfi-filter-item.kat {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

label {
    font-weight: bold;
}

@media (max-width: 768px) {
    .mfi-table thead {
        display: none;
    }

    .mfi-table tr {
        display: block;
        margin-bottom: 15px;
        border-bottom: 2px solid #f0f0f0;
    }

    .mfi-table td {
        display: flex;
        justify-content: space-between;
        padding: 10px 14px;
        font-size: 14px;
        border: none;
    }

    .mfi-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: #555;
        flex: 1;
        padding-right: 10px;
    }

    div.mfi-filter-item.search {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    div.mfi-filter-item.kat {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("mfi_search");
    const rows = document.querySelectorAll("#mfiTable tbody tr");
    const countText = document.querySelector(".mfi-count");
    // Hitung dan update jumlah produk yang terlihat
    function updateCount() {
        const visibleRows = Array.from(rows).filter(r => r.style.display !== "none");
        countText.textContent = `Menampilkan ${visibleRows.length} Produk MFi License`;
    }


    function highlightText(element, query) {
        const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walk.nextNode()) textNodes.push(walk.currentNode);

        textNodes.forEach(node => {
            const val = node.nodeValue;
            const regex = new RegExp(`(${query})`, "gi");
            if (regex.test(val)) {
                const span = document.createElement("span");
                span.innerHTML = val.replace(regex, "<span class='highlight'>$1</span>");
                node.replaceWith(...span.childNodes);
            }
        });
    }


    searchInput.addEventListener("input", function() {
        const query = this.value.trim().toLowerCase();

        rows.forEach(row => {
            let match = false;
            const cells = row.querySelectorAll("td");

            cells.forEach(cell => {
                const text = cell.textContent.toLowerCase();

                // hapus highlight lama (kalau ada)
                cell.querySelectorAll(".highlight").forEach(span => {
                    span.replaceWith(span.textContent);
                });

                if (query && text.includes(query)) {
                    match = true;
                    highlightText(cell, query);
                }
            });


            row.style.display = match || query === "" ? "" : "none";

        });
        updateCount();
    });
    updateCount();
});
</script>
<?php

    return ob_get_clean();
}
add_shortcode('mfi_table', 'mfi_license_table_shortcode');

add_action('init', function() {
    $role = get_role('gforms_only');

    if (!$role) {
        $role = add_role('gforms_only', 'GForms Only', ['read' => true]);
    }

    // Capability dasar biar bisa login dan buka admin
    $role->add_cap('read');
    $role->add_cap('edit_posts'); // diperlukan agar bisa masuk wp-admin
});

add_action('admin_init', function() {
    $role = get_role('gforms_only');
    if ($role) {
        $caps = [
            'gravityforms_edit_forms',
            'gravityforms_view_entries',
            'gravityforms_edit_entries',
            'gravityforms_export_entries',
            'gravityforms_create_form',
            'gravityforms_delete_forms',
        ];

        foreach ($caps as $cap) {
            $role->add_cap($cap);
        }
    }
});

add_action('admin_menu', function() {
    $user = wp_get_current_user();

    if (in_array('gforms_only', (array) $user->roles)) {
        // Hapus semua menu selain Gravity Forms
        remove_menu_page('index.php'); // Dashboard
        remove_menu_page('edit.php'); // Posts
        remove_menu_page('upload.php'); // Media
        remove_menu_page('edit.php?post_type=page'); // Pages
        remove_menu_page('edit-comments.php'); // Comments
        remove_menu_page('themes.php'); // Appearance
        remove_menu_page('plugins.php'); // Plugins
        remove_menu_page('users.php'); // Users
        remove_menu_page('tools.php'); // Tools
        remove_menu_page('options-general.php'); // Settings
    }
}, 999);

add_filter('login_redirect', function($redirect_to, $request, $user) {
    if (isset($user->roles) && in_array('gforms_only', $user->roles)) {
        return admin_url('admin.php?page=gf_edit_forms'); // halaman utama GForms
    }
    return $redirect_to;
}, 10, 3);

add_action('admin_menu', function() {
    $user = wp_get_current_user();

    if (in_array('gforms_only', (array) $user->roles)) {
        global $menu, $submenu;

        // Loop semua menu, hanya pertahankan yang berisi 'gf_' (Gravity Forms)
        foreach ($menu as $index => $item) {
            $slug = $item[2];

            // biarkan hanya gravityforms main menu
            if (
                strpos($slug, 'gf_') === false &&
                $slug !== 'admin.php?page=gf_edit_forms' &&
                $slug !== 'admin.php?page=gf_entries' &&
                $slug !== 'admin.php?page=gf_export' &&
                $slug !== 'admin.php?page=gf_settings'
            ) {
                remove_menu_page($slug);
            }
        }

        // Bersihkan juga submenu di luar Gravity Forms
        foreach ($submenu as $parent => $items) {
            if (strpos($parent, 'gf_') === false) {
                unset($submenu[$parent]);
            }
        }
    }
}, 999);

if (
    strpos($slug, 'gf_') === false &&
    $slug !== 'profile.php'
) {
    remove_menu_page($slug);
}