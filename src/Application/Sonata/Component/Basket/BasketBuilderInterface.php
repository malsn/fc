<?php

namespace Application\Sonata\Component\Basket;

interface BasketBuilderInterface
{
    /**
     * Build a basket
     *
     * @param Basket $basket
     */
    public function build(Basket $basket);
}
