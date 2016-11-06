<?php

namespace Sonata\Bundle\DemoBundle\Payment;

use Sonata\Component\Basket\BasketInterface;
use Sonata\Component\Order\OrderInterface;
use Sonata\Component\Payment\BasePayment;
use Sonata\Component\Payment\TransactionInterface;
use Sonata\Component\Product\ProductInterface;
use Symfony\Component\HttpFoundation\Response;
use Sonata\Component\Transformer\BaseTransformer;
use Symfony\Component\Routing\RouterInterface;
use Buzz\Browser;

class Uniteller extends BasePayment
{
    /**
     * @var Browser
     */
    protected $browser;

    /**
     * @param RouterInterface $router
     * @param Browser|null $browser
     * @param BaseTransformer $basket_transformer
     * @param BaseTransformer $order_transformer
     * @param array $options
     */
    public function __construct(Browser $browser = null, BaseTransformer $basket_transformer, BaseTransformer $order_transformer, array $options)
    {
        $this->setCode('uniteller');
        $this->setEnabled(true);
        $this->setName('Visa/Mastercard через Uniteller');
        $this->addTransformer('basket', $basket_transformer);
        $this->addTransformer('order', $order_transformer);
        $this->setOptions($options);

        $this->browser = $browser;
    }
    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'uniteller';
    }

    public function getName()
    {
        return 'Visa/Mastercard через Uniteller';
    }

    function __call($name, $arguments)
    {
        // TODO: Implement __call() method.
    }

    /**
     * Send information to the bank, this method should handle
     * everything when called
     *
     * @param  \Sonata\Component\Order\OrderInterface $order
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function sendbank(OrderInterface $order)
    {
        // TODO: Implement sendbank() method.
        $params = array(
            'Shop_IDP' => $this->getOption('Uniteller_Point_ID'),
            'Order_IDP' => $order->getId(),
            'Subtotal_P' => sprintf('%0.2f', $order->getTotalInc()),
            'Signature' => strtoupper(md5(md5($this->getOption('Uniteller_Point_ID')).'&'.md5($order->getId()).'&'.md5($order->getTotalInc()).'&'.md5('').'&'.md5('').'&'.md5(300).'&'.md5('').'&'.md5('').'&'.md5('').'&'.md5('').'&'.md5($this->getOption('password')))),
            'Language' => 'ru',
            'Email' => $order->getCustomer()->getEmail(),
            'URL_RETURN_OK' => $this->getOption('success_url'),
            'URL_RETURN_NO' => $this->getOption('decline_url'),
            'Lifetime' => 300,
        );

        // call the callback handler ...
        $form_request = new \Buzz\Message\Form\FormRequest;
        $form_request->setFields($params);
        $response = $this->browser->post(
            $this->getOption('payment_url'),
            [
                'Content-Type'=>'application/x-www-form-urlencoded',
                ''
            ],
            $form_request->getContent()
            );
        //$routeName = $response->getContent() == 'ok' ? 'url_return_ok' : 'url_return_ko';

        return new Response('<div style="width:400px; height: 400px;" name="pay_iframe">'.$response->getContent().'</div>');
    }

    /**
     *
     * @param  \Sonata\Component\Payment\TransactionInterface $transaction
     * @return boolean                                        true if callback ok else false
     */
    public function isCallbackValid(TransactionInterface $transaction)
    {
        // TODO: Implement isCallbackValid() method.
    }

    /**
     * Method called when an error occurs
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleError(TransactionInterface $transaction)
    {
        // TODO: Implement handleError() method.
    }

    /**
     * Send post back confirmation to the bank when the bank callback the site
     *
     * @param  \Sonata\Component\Payment\TransactionInterface $transaction
     * @return \Symfony\Component\HttpFoundation\Response,    false otherwise
     */
    public function sendConfirmationReceipt(TransactionInterface $transaction)
    {
        // TODO: Implement sendConfirmationReceipt() method.
    }

    /**
     * Test if the request variables are valid for the current request
     *
     * WARNING : this methods does not check if the callback is valid
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return boolean true if all parameter are ok
     */
    public function isRequestValid(TransactionInterface $transaction)
    {
        // TODO: Implement isRequestValid() method.
    }

    /**
     * return true is the basket is valid for the current bank gateway
     *
     * @param \Sonata\Component\Basket\BasketInterface $basket
     *
     * @return boolean
     */
    public function isBasketValid(BasketInterface $basket)
    {
        // TODO: Implement isBasketValid() method.
        return true;
    }

    /**
     * return true if the product can be added to the basket
     *
     * @param \Sonata\Component\Basket\BasketInterface $basket
     * @param \Sonata\Component\Product\ProductInterface $product
     */
    public function isAddableProduct(BasketInterface $basket, ProductInterface $product)
    {
        // TODO: Implement isAddableProduct() method.
        return true;
    }

    /**
     * return the transaction id from the bank
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     */
    public function applyTransactionId(TransactionInterface $transaction)
    {
        // TODO: Implement applyTransactionId() method.
    }

    /**
     * return the order reference from the transaction
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return string
     */
    public function getOrderReference(TransactionInterface $transaction)
    {
        // TODO: Implement getOrderReference() method.
    }
}