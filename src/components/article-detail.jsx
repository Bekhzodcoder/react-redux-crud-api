import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import ArticleService from "../service/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import { Loader } from "../ui";

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticleService.getArticleDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
      } catch (error) {
        dispatch(getArticleDetailFailure());
      }
    };
    getArticleDetail();
  }, [slug]);

  return  (
    <div>
      {isLoading ? <Loader />:  articleDetail !== null &&
      <div className="p-5 mb-4 rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
          <p className="col-md-8 fs-4">{articleDetail.description}</p>
          <div className="d-flex gap-3">
            <p>
              <span className="fw-300">Created at:</span>
              {moment(articleDetail.createdAt).format("DD MM, YYYY")}
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <h3 class="mb-0">{articleDetail.author.username}</h3>
              <div class="mb-1 text-body-secondary">
                {articleDetail.author.bio}
              </div>
            </div>
            <div class="col-auto d-none d-lg-block">
              <svg
                class="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  {articleDetail.author.username[0]}
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div>{articleDetail.body}</div>
      </div>}
     
    </div>
  );
};

export default ArticleDetail;
