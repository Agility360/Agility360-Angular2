import { Component, OnInit } from '@angular/core';
import { DEBUG_MODE } from '../../shared/constants';
import { WPPost } from '../../shared/wppost';
import { WordpressService } from '../../providers/wordpress.service';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.css']
})
export class TosComponent implements OnInit {

  posts: WPPost[];
    errMess: string;
    showLoading: boolean;

    constructor(
      private wpservice: WordpressService) {

      if (DEBUG_MODE) console.log('TermsOfUsePage.constructor()');
      this.showLoading = true;
      this.getPosts();
    }

  ngOnInit() {
  }

  refreshData(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('TermsOfUsePage.refreshData()');
        this.getPosts();
        refresher.complete();
      }, 500);
    }

    getPosts() {
      if (DEBUG_MODE) console.log('TermsOfUsePage.getPosts()');

      this.wpservice.getPage(this.wpservice.urlTermsOfUse(), {})
        .subscribe(
        results => {
          if (DEBUG_MODE) console.log('TermsOfUsePage.getPosts() - success', results);
          this.posts = results
          var self = this;
          this.posts.forEach(function(post, id) {
            self.getMedia(post);
          });
        },
        err => {
          if (DEBUG_MODE) console.log('TermsOfUsePage.getPosts() - error', err);
          this.errMess = <any>err
        });
    }

    getMedia(post: WPPost) {

      if (DEBUG_MODE) console.log('TermsOfUsePage.getMedia()', post);
      if (post.featured_media == 0) {
        post.featured_media_obj = this.wpservice.newMedia();
        return;
      };

      this.wpservice.getMedia(post.featured_media)
        .subscribe(
        results => {
          if (DEBUG_MODE) console.log('TermsOfUsePage.getMedia() - success', results);
          post.featured_media_obj = results;
          post.featured_media_url = results.source_url;
        },
        err => {
          if (DEBUG_MODE) console.log('TermsOfUsePage.getMedia() - error', err);
          this.errMess = <any>err;
        });

    }


}
